import Image from 'next/image'
import Test from './components/test'
import Homes from './home.module.css'
import BigTitle from "@/app/components/bigTItle/bigTitle";

export default function Home() {
  const MENUS = [1, 2, 3, 4]


  return (
      <>
        <BigTitle />
        <div className={Homes.container}>
          {MENUS.map((menu)=>{
            const position = menu % 2 == 0 ? Homes.menu_left : Homes.menu_right;
              return(
                  <div key={menu} className={`${position} ${Homes.middle_menue}`} style={{ position: 'relative'}}>
                    <Image
                        src={`/img/menue${menu}.jpg`}
                        alt='menu'
                        fill
                    />
                    <p className={Homes.number}>{menu}</p>
                  </div>
              )
          })}
          {/*<div className={`${Homes.menue_1} ${Homes.middle_menue}`} style={{ position: 'relative'}}>*/}
          {/*  <Image*/}
          {/*      src='/img/menue1.jpg'*/}
          {/*      alt='menu'*/}
          {/*      fill*/}
          {/*  />*/}
          {/*    <p className={Homes.number}>1</p>*/}
          {/*</div>*/}
          {/*<div className={`${Homes.menue_2} ${Homes.middle_menue}`} style={{ position: 'relative'}}>*/}
          {/*  <Image*/}
          {/*      src='/img/menue2.jpg'*/}
          {/*      alt='menu'*/}
          {/*      fill*/}
          {/*  />*/}
          {/*    <p className={Homes.number}>2</p>*/}
          {/*</div>*/}
          {/*<div className={`${Homes.menue_3} ${Homes.middle_menue}`} style={{ position: 'relative'}}>*/}
          {/*  <Image*/}
          {/*      src='/img/menue3.jpg'*/}
          {/*      alt='menu'*/}
          {/*      fill*/}
          {/*  />*/}
          {/*    <p className={Homes.number}>3</p>*/}
          {/*</div>*/}
          {/*<div className={`${Homes.menue_4} ${Homes.middle_menue}`} style={{ position: 'relative'}}>*/}
          {/*  <Image*/}
          {/*      src='/img/menue4.jpg'*/}
          {/*      alt='menu'*/}
          {/*      fill*/}
          {/*  />*/}
          {/*    <p className={Homes.number}>4</p>*/}
          {/*</div>*/}

          <div className={Homes.detail_menue}>
            <p><b>１．三色のチーズ牛丼パフェ</b></p>
            <p className={Homes.text}>これを食べると運気アップ！　当店の一押しです。</p>
            <p className={Homes.text}>おいしくなあれ！！！！</p>
            <p className={Homes.menue_price}><b>￥399</b></p>
          </div>

          <div className={Homes.detail_menue}>
            <p><b>２．三色のチーズ牛丼パフェ</b></p>
            <p className={Homes.text}>これを食べると運気アップ！　当店の一押しです。</p>
            <p className={Homes.text}>おいしくなあれ！！！！</p>
            <p className={Homes.menue_price}><b>￥399</b></p>
          </div>

          <div className={Homes.detail_menue}>
            <p><b>３．三色のチーズ牛丼パフェ</b></p>
            <p className={Homes.text}>これを食べると運気アップ！　当店の一押しです。</p>
            <p className={Homes.text}>おいしくなあれ！！！！</p>
            <p className={Homes.menue_price}><b>￥399</b></p>
          </div>

          <div className={Homes.detail_menue}>
            <p><b>４．三色のチーズ牛丼パフェ</b></p>
            <p className={Homes.text}>これを食べると運気アップ！　当店の一押しです。</p>
            <p className={Homes.text}>おいしくなあれ！！！！</p>
            <p className={Homes.menue_price}><b>￥399</b></p>
          </div>
        </div>
      </>
  )
}
