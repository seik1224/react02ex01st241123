import React, { useEffect, useState } from "react";
import MbtiProfile from "./MbtiProfile";

function MbtiResult({name, mbti}) {

  /*
  useEffect(()=>{
    console.log(name);
    console.log(mbti);
  },[])
  */

  const [mbtiData, setMbtiData] = useState(null);

  useEffect(()=>{
    fetch('https://raw.githubusercontent.com/seik1224/data-zelda/main/mbti.json')
    .then((res)=> res.json())
    .then((data)=>{
      console.log(data);
      const result = data.find((item)=>item.type === mbti);
      console.log(result);
      setMbtiData(result);
    })
    .catch((err)=>console.error('mbti데이터 가져오기 오류', err));
  },[]);

  return (
    <div className="text-center">
      <div className="flex flex-col justify-center items-center relative z-10">
        {mbtiData && (
          <>
            <img
              className="w-[200px] bg-blend-darken"
              src={process.env.PUBLIC_URL + mbtiData.image}
              alt="mbti이미지"
            />
            <h2
              className="text-2xl font-bold mb-4 px-6 py-2 -mt-10 rounded-full border-[6px] bg-white box-border"
              style={{ borderColor: mbtiData.color, color: mbtiData.color }}
            >
              {name}
            </h2>
          </>
        )}
      </div>

      {
        mbtiData ? (
          <MbtiProfile data={mbtiData} />
        ) : (
          <p>MBTI 데이터를 불러오는 중입니다...</p>
        )
      }
      
    </div>
  );
}

export default MbtiResult;
