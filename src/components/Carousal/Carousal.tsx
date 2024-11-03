import clothcarousal from '../../assets/clothescarousal.jpg';
import shoescarousal from '../../assets/shoesCarousal.jpg';
import accessorycarousal from '../../assets/accessorycarousal.jpg';
import { useState } from 'react';

const images = [clothcarousal, shoescarousal, accessorycarousal];

const Carousal = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = (index : number) => {
    setCurrentIndex(index);
  }

  return (
    <div className="w-full flex flex-col items-center bg-gray-800 py-8 rounded-lg shadow-lg">
    
      <div 
        className="w-full h-64 bg-center bg-no-repeat bg-cover rounded-lg" 
        style={{ backgroundImage: `url(${images[currentIndex]})` }} 
      />
      
      
      <div className="flex justify-center mt-4 space-x-3">
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
