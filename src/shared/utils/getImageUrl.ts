export const getImageUrl = (img: string) => {
    if (!img) return ""; 
    return img.startsWith("http") 
      ? img 
      : `${import.meta.env.VITE_REACT_CLOUDINARYBASEURL}${img}`;
  };
  