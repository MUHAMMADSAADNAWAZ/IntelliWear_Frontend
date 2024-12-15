import clothcarousal from '../../assets/clothescarousal.jpg';
import shoescarousal from '../../assets/shoesCarousal.jpg';
import accessorycarousal from '../../assets/accessorycarousal.jpg';
import { useState } from 'react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';

const images = [clothcarousal, shoescarousal, accessorycarousal];

const Carousal = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = (index : number) => {
    if(index === -1){
      setCurrentIndex(images.length-1)
      return;
    }
    if(index === images.length){
      setCurrentIndex(0)
      return;
    }
    setCurrentIndex(index);
  }

  return (
    
      <div 
        className="w-full h-[550px] bg-center bg-no-repeat bg-cover relative mt-6" 
        style={{ backgroundImage: `url(${images[currentIndex]})` }} 
      >
         <BiLeftArrowAlt style={{ fontSize: 40, color: "black" }} className='absolute top-[50%] left-3 cursor-pointer bg-white rounded-full p-1' onClick={() => {handleClick(currentIndex-1)}}/>
         <BiRightArrowAlt style={{ fontSize: 40, color: "black" }} className='absolute top-[50%] right-3 cursor-pointer bg-white rounded-full p-1' onClick={() => {handleClick(currentIndex+1)}}/>

        <div className="flex justify-center mt-4 space-x-2 absolute bottom-4 w-full">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={`h-3 w-3 rounded-full ${index === currentIndex ? "bg-yellow-500" : "bg-gray-400"} focus:outline-none`}
          />
        ))}
      </div>
      </div>
      
  )
}

export default Carousal;

{/* <div className="w-full flex flex-col items-center bg-gray-800 py-8 rounded-lg shadow-lg "> */}


{/* 
<div className="flex justify-center mt-4 space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={`h-3 w-3 rounded-full ${index === currentIndex ? "bg-yellow-500" : "bg-gray-400"} focus:outline-none`}
          />
        ))}
      </div>

    </div> */}