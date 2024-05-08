import { useState, useEffect } from "react";

const App = () => {
  const [newImg, setNewImg] = useState(0);
  const [imgURL, setImgURL] = useState("https://i.redd.it/award_images/t5_2qh1o/ootzpllhcnf31_ExplodeyHeart.png");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://www.reddit.com/r/aww/top/.json?t=all');
      const responsejson = await response.json();
      const children = responsejson.data.children;
      const all_awardings = children[newImg]?.data?.all_awardings;
      if (all_awardings && all_awardings.length > 0) {
        const firstAwarding = all_awardings[0];
        const icon_url = firstAwarding.icon_url;
        setImgURL(icon_url);
      }
    };

    fetchData();
  }, [newImg]);

   useEffect(() => {
    const interval = setInterval(() => {
      setNewImg(prevCount => (prevCount === 25 ? 0 : prevCount + 1));
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  
  
  return (
    <>
      <img src={imgURL} alt="My Image" className='img' />
      <button onClick={() => setNewImg(prevCount => (prevCount === 0 ? 25 : prevCount - 1))}>left</button>
      <button onClick={() => setNewImg(prevCount => (prevCount === 25 ? 0 : prevCount + 1))}>right</button>
    </>
  );
};

export default App;