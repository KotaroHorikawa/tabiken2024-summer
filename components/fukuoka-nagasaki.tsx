'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Menu, X, ChevronRight } from 'lucide-react'
import { Noto_Sans } from 'next/font/google'

const notoSans = Noto_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export default function Component() {
  const [scrollPosition1, setScrollPosition1] = useState(0);
  const [scrollPosition2, setScrollPosition2] = useState(0);
  const scrollRef1 = useRef<HTMLDivElement>(null);
  const scrollRef2 = useRef<HTMLDivElement>(null);
  const animationRef1 = useRef<number>();
  const animationRef2 = useRef<number>();

  const [activeButton, setActiveButton] = useState('#Sights');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sightsRef = useRef<HTMLDivElement>(null);
  const restoRef = useRef<HTMLDivElement>(null);
  const restRef = useRef<HTMLDivElement>(null);

  const images1 = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/938b60c2-ff9b-44b6-ab4c-f0b7051bae6e-0tsu5K8ERSpwGUDXnK95j0eyNavzXT.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/635585c5d52fa697e3f6b5c6feb53af2-1024x682-6Qw0O6qHdav7Zps0utWhR7mWVlfuUH.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/spot-nagasaki_meganebashi-PEF94gZBDL95kEty7JxciqNaNb0RUx.jpg"
  ];

  const images2 = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WRKzCX6VKxVA7d3rWCPhXtJmpDTMSwWoGLYFfIAT__1171_775-HPVtSfaZR8bUNe5NEleCCtndo7P2Mg.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/34TFf0v7ZylAkKuPH6qh7i68eHH70syfg0huf5Gj__1171_780-MlkGLlMFWN4Q0YwxuI8h7O0vLUaQqR.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/n3smbwAXu6hKV2Fsl0uURmEwHYdM1c0XukIPvuXP__1171_781-tb1sB93fWo69se3MDhh3X96QT2tbpE.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/shutterstock_606388814-min-scaled-ZiSyBPu6YEyh1DM7tqUeJtjp0fdKkA.jpg"
  ];

  useEffect(() => {
    const scrollContainer1 = scrollRef1.current;
    const scrollContainer2 = scrollRef2.current;
    if (scrollContainer1 && scrollContainer2) {
      const imageWidth = 316; // 300px width + 16px margin
      const totalWidth1 = imageWidth * images1.length;
      const totalWidth2 = imageWidth * images2.length;

      const animate1 = () => {
        setScrollPosition1((prevPosition) => {
          const newPosition = (prevPosition + 1) % totalWidth1;
          return newPosition;
        });
        animationRef1.current = requestAnimationFrame(animate1);
      };

      const animate2 = () => {
        setScrollPosition2((prevPosition) => {
          const newPosition = prevPosition + 1;
          if (newPosition >= totalWidth2) {
            return 0;
          }
          return newPosition;
        });
        animationRef2.current = requestAnimationFrame(animate2);
      };

      animationRef1.current = requestAnimationFrame(animate1);
      animationRef2.current = requestAnimationFrame(animate2);

      return () => {
        if (animationRef1.current) {
          cancelAnimationFrame(animationRef1.current);
        }
        if (animationRef2.current) {
          cancelAnimationFrame(animationRef2.current);
        }
      };
    }
  }, [images1.length, images2.length]);

  const renderImages = (images: string[], key: string) => {
    const imageElements = [];
    for (let i = 0; i < 3; i++) {
      imageElements.push(...images.map((src, index) => (
        <div key={`${key}-${i}-${index}`} style={{ flex: '0 0 300px', marginRight: '16px' }}>
          <div style={{ width: '300px', height: '200px', position: 'relative' }}>
            <Image 
              src={src}
              layout="fill"
              objectFit="cover"
              alt={`Gallery image ${index + 1}`}
              className="rounded-lg"
            />
          </div>
        </div>
      )));
    }
    return imageElements;
  };

  const handleButtonClick = (button: string) => {
    setActiveButton(button);
    let ref;
    switch (button) {
      case '#Sights':
        ref = sightsRef;
        break;
      case '#Resto':
        ref = restoRef;
        break;
      case '#Rest':
        ref = restRef;
        break;
    }
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className={`bg-[#FF5722] min-h-screen text-white ${notoSans.className}`}>
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 bg-[#FF5722] shadow-md z-50">
        <div className="flex justify-between items-center p-6 max-w-7xl mx-auto">
          <div className="text-sm">Travel brochure by Ichiriduka</div>
          <nav className="hidden md:flex space-x-4">
            {['#Sights', '#Resto', '#Rest'].map((button) => (
              <button
                key={button}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg ${
                  activeButton === button
                    ? 'bg-white text-[#FF5722] shadow-md'
                    : 'bg-transparent text-white border-2 border-white hover:bg-white hover:text-[#FF5722]'
                }`}
                style={{
                  boxShadow: activeButton === button ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
                }}
                onClick={() => handleButtonClick(button)}
              >
                {button}
              </button>
            ))}
          </nav>
          <button className="md:hidden z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Enhanced Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#FF5722] bg-opacity-95 z-40 md:hidden flex flex-col items-center justify-center">
          <div className="text-white text-2xl font-bold mb-8">Menu</div>
          {['#Sights', '#Resto', '#Rest'].map((button) => (
            <button
              key={button}
              className={`w-64 py-4 mb-4 text-xl font-bold rounded-full transition-all duration-300 ease-in-out ${
                activeButton === button
                  ? 'bg-white text-[#FF5722] shadow-lg'
                  : 'bg-transparent text-white border-2 border-white hover:bg-white hover:text-[#FF5722]'
              }`}
              onClick={() => handleButtonClick(button)}
            >
              {button}
            </button>
          ))}
        </div>
      )}

      {/* Main Content */}
      <main className="px-4 pb-16 pt-24"> {/* Added pt-24 to account for the fixed header */}
        <div className="text-center max-w-2xl mx-auto my-12">
          <h1 className="text-4xl font-bold mb-4">Next trip is</h1>
          <h2 className="text-5xl md:text-6xl font-bold mb-2">FUKUOKA &</h2>
          <h2 className="text-5xl md:text-6xl font-bold">NAGASAKI</h2>
          <p className="mt-2">ICHIRIDUKA 2024</p>
        </div>

        {/* Animated Image Gallery 1 (Left to Right) */}
        <div className="mt-8 overflow-hidden">
          <div 
            ref={scrollRef1}
            style={{
              display: 'flex',
              transform: `translateX(-${scrollPosition1}px)`,
              width: `${images1.length * 316 * 3}px`,
            }}
          >
            {renderImages(images1, 'slider1')}
          </div>
        </div>

        {/* Animated Image Gallery 2 (Right to Left) */}
        <div className="mt-8 overflow-hidden">
          <div 
            ref={scrollRef2}
            style={{
              display: 'flex',
              transform: `translateX(-${scrollPosition2}px)`,
              width: `${images2.length * 316 * 3}px`,
            }}
          >
            {renderImages(images2, 'slider2')}
          </div>
        </div>

        {/* Text Content */}
        <div className="mt-8 text-white">
          <h3 className="text-xl font-bold mb-2">2泊3日を楽しみつくすための</h3>
          <div className="flex items-center">
            <h3 className="text-xl font-bold">福岡・長崎観光ガイド。</h3>
            <MapPin className="ml-2" />
          </div>
        </div>

        {/* Sights Section */}
        <div ref={sightsRef} className="mt-16 space-y-8 flex flex-wrap justify-center">
          <h2 className="text-3xl font-bold mb-8 w-full text-center">#Sights</h2>
          {/* 太宰府天満宮 */}
          <div className="bg-white text-black p-8 rounded-lg relative w-full sm:w-5/12 md:w-4/12 mx-3 mb-8 text-center">
            <div className="absolute -top-4 -right-4 bg-[#FF5722] text-white p-2 rounded-full shadow-lg" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
              01
            </div>
            <Image
              src={"/img/tenmanguu.png"}
              width={500}
              height={300}
              alt="太宰府天満宮"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-[#FF5722] font-bold mb-2">#Sights</p>
            <h3 className="text-3xl font-bold mb-4">太宰府天満宮</h3>
            <p className="mb-4">学問の神様を祀る<br />歴史ある神社。</p>
            <Link href="https://www.dazaifutenmangu.or.jp/" target="_blank" rel="noopener noreferrer" className="border border-black rounded-full px-4 py-2 inline-flex items-center">
              READ MORE
              <ChevronRight className="ml-2" />
            </Link>
            <div className="mt-8">
              <p className="font-bold mb-2">FUKUOKA</p>
              <p>福岡県太宰府市宰府4-7-1</p>
            </div>
          </div>

          {/* キャナルシティ博多 */}
          <div className="bg-white text-black p-8 rounded-lg relative w-full sm:w-5/12 md:w-4/12 mx-3 mb-8 text-center">
            <div className="absolute -top-4 -right-4 bg-[#FF5722] text-white p-2 rounded-full shadow-lg" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
              02
            </div>
            <Image
              src={images1[1]}
              width={500}
              height={300}
              alt="キャナルシティ博多"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-[#FF5722] font-bold mb-2">#Sights</p>
            <h3 className="text-3xl font-bold mb-4">キャナルシティ博多</h3>
            <p className="mb-4">自然の中で多彩な体験を得る<br />「都市の劇場」</p>
            <Link href="https://canalcity.co.jp/" target="_blank" rel="noopener noreferrer" className="border border-black rounded-full px-4 py-2 inline-flex items-center">
              READ MORE
              <ChevronRight className="ml-2" />
            </Link>
            <div className="mt-8">
              <p className="font-bold mb-2">FUKUOKA</p>
              <p>福岡県福岡市博多区住吉1丁目2</p>
            </div>
          </div>

          {/* 門司港レトロ */}
          <div className="bg-white text-black p-8 rounded-lg relative w-full sm:w-5/12 md:w-4/12 mx-3 mb-8 text-center">
            <div className="absolute -top-4 -right-4 bg-[#FF5722] text-white p-2 rounded-full shadow-lg" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
              03
            </div>
            <Image
              src={"/img/retoro.jpg"}
              width={500}
              height={300}
              alt="門司港レトロ"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-[#FF5722] font-bold mb-2">#Sights</p>
            <h3 className="text-3xl font-bold mb-4">門司港レトロ</h3>
            <p className="mb-4">明治・大正時代の建物が立ち並ぶ<br />散策が楽しいレトロな港町。</p>
            <Link href="https://www.mojiko.info/" target="_blank" rel="noopener noreferrer" className="border border-black rounded-full px-4 py-2 inline-flex items-center">
              READ MORE
              <ChevronRight className="ml-2" />
            </Link>
            <div className="mt-8">
              <p className="font-bold mb-2">FUKUOKA</p>
              <p>福岡県北九州市門司区港町5-1</p>
            </div>
          </div>

          {/* 糸島半島 */}
          <div className="bg-white text-black p-8 rounded-lg relative w-full sm:w-5/12 md:w-4/12 mx-3 mb-8 text-center">
            <div className="absolute -top-4 -right-4 bg-[#FF5722] text-white p-2 rounded-full shadow-lg" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
              04
            </div>
            <Image
              src={"/img/itojima.jpg"}
              width={500}
              height={300}
              alt="糸島半島"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-[#FF5722] font-bold mb-2">#Sights</p>
            <h3 className="text-3xl font-bold mb-4">糸島半島</h3>
            <p className="mb-4">美しい海岸線と自然がに囲まれた<br />カフェやアートスポットが自慢。</p>
            <Link href="https://www.itoshima-kanko.net/" target="_blank" rel="noopener noreferrer" className="border border-black rounded-full px-4 py-2 inline-flex items-center">
              READ MORE
              <ChevronRight className="ml-2" />
            </Link>
            <div className="mt-8">
              <p className="font-bold mb-2">FUKUOKA</p>
              <p>福岡県糸島市</p>
            </div>
          </div>

          {/* ハウステンボス */}
          <div className="bg-white text-black p-8 rounded-lg relative w-full sm:w-5/12 md:w-4/12 mx-3 mb-8 text-center">
            <div className="absolute -top-4 -right-4 bg-[#FF5722] text-white p-2 rounded-full shadow-lg" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
              01
            </div>
            <Image
              src={"/img/house.jpg"}
              width={500}
              height={300}
              alt="ハウステンボス"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-[#FF5722] font-bold mb-2">#Sights</p>
            <h3 className="text-3xl font-bold mb-4">ハウステンボス</h3>
            <p className="mb-4">ヨーロッパ風の街並みが魅力的な<br />九州随一のテーマパーク</p>
            <Link href="https://www.huistenbosch.co.jp/" target="_blank" rel="noopener noreferrer" className="border border-black rounded-full px-4 py-2 inline-flex items-center">
              READ MORE
              <ChevronRight className="ml-2" />
            </Link>
            <div className="mt-8">
              <p className="font-bold mb-2">NAGASAKI</p>
              <p>長崎県佐世保市ハウステンボス町1-1</p>
            </div>
          </div>

          {/* グラバー園 */}
          <div className="bg-white text-black p-8 rounded-lg relative w-full sm:w-5/12 md:w-4/12 mx-3 mb-8 text-center">
            <div className="absolute -top-4 -right-4 bg-[#FF5722] text-white p-2 rounded-full shadow-lg" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
              02
            </div>
            <Image
              src={"/img/graba.jpeg"}
              width={500}
              height={300}
              alt="グラバー園"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-[#FF5722] font-bold mb-2">#Sights</p>
            <h3 className="text-3xl font-bold mb-4">グラバー園</h3>
            <p className="mb-4">長崎の歴史が感じられる<br />異国情緒あふれる庭園。</p>
            <Link href="https://www.glover-garden.jp/" target="_blank" rel="noopener noreferrer" className="border border-black rounded-full px-4 py-2 inline-flex items-center">
              READ MORE
              <ChevronRight className="ml-2" />
            </Link>
            <div className="mt-8">
              <p className="font-bold mb-2">NAGASAKI</p>
              <p>長崎県長崎市南山手町8-1</p>
            </div>
          </div>

          {/* 稲佐山 */}
          <div className="bg-white text-black p-8 rounded-lg relative w-full sm:w-5/12 md:w-4/12 mx-3 mb-8 text-center">
            <div className="absolute -top-4 -right-4 bg-[#FF5722] text-white p-2 rounded-full shadow-lg" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
              03
            </div>
            <Image
              src={"/img/isayama.jpeg"}
              width={500}
              height={300}
              alt="稲佐山"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-[#FF5722] font-bold mb-2">#Sights</p>
            <h3 className="text-3xl font-bold mb-4">稲佐山</h3>
            <p className="mb-4">夜景が特に美しい<br />長崎市内を一望できる絶景スポット</p>
            <Link href="https://www.inasayama.com/" target="_blank" rel="noopener noreferrer" className="border border-black rounded-full px-4 py-2 inline-flex items-center">
              READ MORE
              <ChevronRight className="ml-2" />
            </Link>
            <div className="mt-8">
              <p className="font-bold mb-2">NAGASAKI</p>
              <p>長崎県長崎市稲佐町364</p>
            </div>
          </div>

          {/* 九十九島 */}
          <div className="bg-white text-black p-8 rounded-lg relative w-full sm:w-5/12 md:w-4/12 mx-3 mb-8 text-center">
            <div className="absolute -top-4 -right-4 bg-[#FF5722] text-white p-2 rounded-full shadow-lg" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
              04
            </div>
            <Image
              src={"/img/parusi.jpeg"}
              width={500}
              height={300}
              alt="九十九島"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-[#FF5722] font-bold mb-2">#Sights</p>
            <h3 className="text-3xl font-bold mb-4">九十九島</h3>
            <p className="mb-4">遊覧船やカヤックが楽しめる<br />海のリゾート施設。</p>
            <Link href="https://www.pearlsea.jp/" target="_blank" rel="noopener noreferrer" className="border border-black rounded-full px-4 py-2 inline-flex items-center">
              READ MORE
              <ChevronRight className="ml-2" />
            </Link>
            <div className="mt-8">
              <p className="font-bold mb-2">NAGASAKI</p>
              <p>長崎県佐世保市鹿子前町1008</p>
            </div>
          </div>


          {/* 雲仙温泉 */}
          <div className="bg-white text-black p-8 rounded-lg relative w-full sm:w-5/12 md:w-4/12 mx-3 mb-8 text-center">
            <div className="absolute -top-4 -right-4 bg-[#FF5722] text-white p-2 rounded-full shadow-lg" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
              05
            </div>
            <Image
              src={"/img/unzen.jpeg"}
              width={500}
              height={300}
              alt="雲仙温泉"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-[#FF5722] font-bold mb-2">#Sights</p>
            <h3 className="text-3xl font-bold mb-4">雲仙温泉</h3>
            <p className="mb-4">自然に囲まれた<br />絶景の露天風呂</p>
            <Link href="https://www.unzen.org/" target="_blank" rel="noopener noreferrer" className="border border-black rounded-full px-4 py-2 inline-flex items-center">
              READ MORE
              <ChevronRight className="ml-2" />
            </Link>
            <div className="mt-8">
              <p className="font-bold mb-2">NAGASAKI</p>
              <p>長崎県雲仙市小浜町雲仙</p>
            </div>
          </div>
        </div>

        

        {/* Resto Section */}
        <div ref={restoRef} className="mt-16 space-y-8 flex flex-wrap justify-center">
          <h2 className="text-3xl font-bold mb-8 w-full text-center">#Resto</h2>
          {/* 鯛茶漬け専門店 鯛茶福 */}
          <div className="bg-white text-black p-8 rounded-lg relative w-full sm:w-5/12 md:w-4/12 mx-3 mb-8 text-center">
            <div className="absolute -top-4 -right-4 bg-[#FF5722] text-white p-2 rounded-full shadow-lg" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
              01
            </div>
            <Image
              src="/img/taitya.jpg"
              width={500}
              height={300}
              alt="鯛茶漬け"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-[#FF5722] font-bold mb-2">#Resto</p>
            <h3 className="text-3xl font-bold mb-4">鯛茶漬け専門店 鯛茶福</h3>
            <p className="mb-4">福岡名物の鯛茶漬けを<br />専門に提供する人気店。</p>
            <Link href="https://www.taicha-fuku.com/" target="_blank" rel="noopener noreferrer" className="border border-black rounded-full px-4 py-2 inline-flex items-center">
              READ MORE
              <ChevronRight className="ml-2" />
            </Link>
            <div className="mt-8">
              <p className="font-bold mb-2">FUKUOKA</p>
              <p>福岡県福岡市中央区大名1-15-11</p>
            </div>
          </div>

          {/* 四海樓 */}
          <div className="bg-white text-black p-8 rounded-lg relative w-full sm:w-5/12 md:w-4/12 mx-3 mb-8 text-center">
            <div className="absolute -top-4 -right-4 bg-[#FF5722] text-white p-2 rounded-full shadow-lg" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
              02
            </div>
            <Image
              src="/img/nagapon.jpeg"
              width={500}
              height={300}
              alt="四海樓 interior"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-[#FF5722] font-bold mb-2">#Resto</p>
            <h3 className="text-3xl font-bold mb-4">四海樓</h3>
            <p className="mb-4">長崎ちゃんぽん発祥の店<br />歴史ある中華料理店。</p>
            <Link href="https://www.shikairou.com/" target="_blank" rel="noopener noreferrer" className="border border-black rounded-full px-4 py-2 inline-flex items-center">
              READ MORE
              <ChevronRight className="ml-2" />
            </Link>
            <div className="mt-8">
              <p className="font-bold mb-2">NAGASAKI</p>
              <p>長崎県長崎市松が枝町4-5</p>
            </div>
          </div>

          {/* 元祖長浜屋 */}
          <div className="bg-white text-black p-8 rounded-lg relative w-full sm:w-5/12 md:w-4/12 mx-3 mb-8 text-center">
            <div className="absolute -top-4 -right-4 bg-[#FF5722] text-white p-2 rounded-full shadow-lg" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
              03
            </div>
            <Image
              src="/img/nagahamaya.webp"
              width={500}
              height={300}
              alt="元祖長浜屋"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-[#FF5722] font-bold mb-2">#Resto</p>
            <h3 className="text-3xl font-bold mb-4">元祖長浜屋</h3>
            <p className="mb-4">博多豚骨ラーメンの<br />発祥の店として有名。</p>
            <Link href="http://www.ganso-nagahamaya.co.jp/" target="_blank" rel="noopener noreferrer" className="border border-black rounded-full px-4 py-2 inline-flex items-center">
              READ MORE
              <ChevronRight className="ml-2" />
            </Link>
            <div className="mt-8">
              <p className="font-bold mb-2">FUKUOKA</p>
              <p>福岡県福岡市博多区長浜1-1-1</p>
            </div>
          </div>
        </div>

        {/* Rest Section */}
        <div ref={restRef} className="mt-16 space-y-8 flex flex-wrap justify-center">
          <h2 className="text-3xl font-bold mb-8 w-full text-center">#Rest</h2>
          
          {/* THE LIVELY 福岡博多 */}
          <div className="bg-white text-black p-8 rounded-lg relative w-full sm:w-5/12 md:w-4/12 mx-3 mb-8 text-center">
            <div className="absolute -top-4 -right-4 bg-[#FF5722] text-white p-2 rounded-full shadow-lg" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
              01
            </div>
            <Image
              src="/img/hotehaka.jpg"
              width={500}
              height={300}
              alt="THE LIVELY 福岡博多"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-[#FF5722] font-bold mb-2">#Rest</p>
            <h3 className="text-3xl font-bold mb-4">&HOTEL HAKATA</h3>
            <p className="mb-4">モダンでスタイリッシュな<br />博多駅近くのホテル。</p>
            <Link href="https://and-hotel.jp/" target="_blank" rel="noopener noreferrer" className="border border-black rounded-full px-4 py-2 inline-flex items-center">
              READ MORE
              <ChevronRight className="ml-2" />
            </Link>
            <div className="mt-8">
              <p className="font-bold mb-2">FUKUOKA</p>
              <p>福岡県福岡市博多区冷泉町9-6</p>
            </div>
          </div>

          {/* 長崎スカイホテル */}
          <div className="bg-white text-black p-8 rounded-lg relative w-full sm:w-5/12 md:w-4/12 mx-3 mb-8 text-center">
            <div className="absolute -top-4 -right-4 bg-[#FF5722] text-white p-2 rounded-full shadow-lg" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
              02
            </div>
            <Image
              src="/img/skyhotel.jpg"
              width={500}
              height={300}
              alt="長崎スカイホテル exterior"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-[#FF5722] font-bold mb-2">#Rest</p>
            <h3 className="text-3xl font-bold mb-4">長崎スカイホテル</h3>
            <p className="mb-4">長崎の街を一望できる<br />高台に位置するホテル。</p>
            <Link href="https://hpdsp.jp/nagasakiskyhotel/" target="_blank" rel="noopener noreferrer" className="border border-black rounded-full px-4 py-2 inline-flex items-center">
              READ MORE
              <ChevronRight className="ml-2" />
            </Link>
            <div className="mt-8">
              <p className="font-bold mb-2">NAGASAKI</p>
              <p>長崎県長崎市江の浦町18-1</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}