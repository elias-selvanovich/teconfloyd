import { MercadoPagoConfig, Preference } from 'mercadopago';

// Instanciar Mercado Pago con el token de acceso
// Se asume que la variable está configurada en Vercel
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || ''
});

export default async function handler(req: any, res: any) {
  console.log("TOKEN->: ", process.env.MERCADOPAGO_ACCESS_TOKEN);
  // Configurar CORS básico por si se llama desde otro origen
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { amount, title } = req.body;

    if (!amount || isNaN(Number(amount))) {
      return res.status(400).json({ message: 'Amount is required and must be a number' });
    }

    // El host base (para las URLs de retorno)
    // Vercel inyecta VERCEL_URL o VERCEL_PROJECT_PRODUCTION_URL
    const protocol = process.env.NODE_ENV === 'development' ? 'http://' : 'https://';
    let host = 'http://localhost:5173'; // Fallback para dev local

    if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
      host = `${protocol}${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
    } else if (process.env.VERCEL_URL) {
      host = `${protocol}${process.env.VERCEL_URL}`;
    }

    const preference = new Preference(client);

    const isLocalhost = host.includes('localhost');

    const preferenceBody: any = {
      items: [
        {
          id: 'donacion_tc_floyd',
          title: title || 'Aporte Te Con Floyd',
          quantity: 1,
          unit_price: Number(amount),
          currency_id: 'ARS',
        }
      ],
      back_urls: {
        success: `${host}/gracias`,
        failure: `${host}/show?status=failure`,
        pending: `${host}/show?status=pending`
      }
    };

    // Mercado Pago suele rebotar el auto_return si las URLs son localhost
    if (!isLocalhost) {
      preferenceBody.auto_return = 'approved';
    }

    const response = await preference.create({
      body: preferenceBody
    });

    return res.status(200).json({
      id: response.id,
      init_point: response.init_point
    });

  } catch (error) {
    console.error('Error creating preference:', error);
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
}
