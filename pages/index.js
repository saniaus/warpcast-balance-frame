export default function Home() {
  return (
    <div>
      <h1>Balance Tracker Frame</h1>
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:input:text" content="Masukkan alamat dompet" />
      <meta property="fc:frame:button:1" content="Lihat Saldo" />
      <meta property="fc:frame:button:1:action" content="post" />
      <meta property="fc:frame:post_url" content="/api/balance" />
      <meta property="og:title" content="Balance Tracker" />
      <meta property="og:description" content="Lacak saldo dompet Anda di berbagai chain" />
    </div>
  );
}
