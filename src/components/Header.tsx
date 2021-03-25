import Image from 'next/image';

export default function Header() {
  return (
    <header className="text-center">
      <div className="ml-4 text-center">
        <Image
          layout="intrinsic"
          width={200}
          height={180}
          src="/img/logo-nd.png"
          alt="Logotipo da Nova Dimensão"
        />
      </div>
      <h1>cPicker</h1>
      <p className="lead">O coletor de comentários de livestreams</p>
    </header>
  );
}
