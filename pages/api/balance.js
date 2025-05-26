const axios = require('axios');

export default async function handler(req, res) {
  const { untrustedData } = req.body;
  const address = untrustedData?.inputText;

  if (!address) {
    return res.status(400).json({ error: 'Alamat dompet diperlukan' });
  }

  try {
    const response = await axios.get('https://pro-openapi.debank.com/v1/user/total_balance', {
      params: { addr: address },
      headers: { 'AccessKey': process.env.DEBANK_API_KEY }
    });

    const balanceData = response.data;
    const description = `Total Saldo: $${balanceData.total_usd_value}\nETH: ${balanceData.chain_list.find(c => c.id === 'eth')?.usd_value || 0}\nBNB: ${balanceData.chain_list.find(c => c.id === 'bsc')?.usd_value || 0}`;

    res.status(200).json({
      type: 'frame',
      frame: {
        version: 'vNext',
        buttons: [{ label: 'Segarkan', action: 'post' }],
        post_url: '/api/balance',
        og: {
          title: 'Saldo Dompet Anda',
          description: description
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data saldo' });
  }
}
