// import React from "react";
// import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
// import Link from "next/link";

// const ProjectCard = ({ imgUrl, title, description, gitUrl, previewUrl }) => {
//   return (
//     <div>
//       <div
//         className="h-52 md:h-72 rounded-t-xl relative group"
//         style={{ background: `url(${imgUrl})`, backgroundSize: "cover" }}
//       >
//         <div className="overlay items-center justify-center absolute top-0 left-0 w-full h-full bg-[#181818] bg-opacity-0 hidden group-hover:flex group-hover:bg-opacity-80 transition-all duration-500 ">
//           <Link
//             href={gitUrl}
//             className="h-14 w-14 mr-2 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
//           >
//             <CodeBracketIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  cursor-pointer group-hover/link:text-white" />
//           </Link>
//           <Link
//             href={previewUrl}
//             className="h-14 w-14 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
//           >
//             <EyeIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  cursor-pointer group-hover/link:text-white" />
//           </Link>
//         </div>
//       </div>
//       <div className="text-white rounded-b-xl mt-3 bg-[#181818]py-6 px-4">
//         <h5 className="text-xl font-semibold mb-2">{title}</h5>
//         <p className="text-[#ADB7BE]">{description}</p>
//       </div>
//     </div>
//   );
// };

// export default ProjectCard;
import React, { useState, useEffect } from "react";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

const ProjectCard = ({ imgUrl, title, description, gitUrl, previewUrl }) => {
  const [showCarousel, setShowCarousel] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isPreviewUrlList = Array.isArray(previewUrl);

  useEffect(() => {
    console.log("Current Image Index:", currentImageIndex);
    console.log("Preview URL:", previewUrl);
  }, [currentImageIndex, previewUrl]);

  const handlePreviewClick = (e) => {
    if (isPreviewUrlList) {
      e.preventDefault();
      setShowCarousel(true);
    }
  };

  const handleCloseCarousel = () => {
    setShowCarousel(false);
    setCurrentImageIndex(0);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % previewUrl.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + previewUrl.length) % previewUrl.length);
  };

  return (
    <div>
      <div
        className="h-52 md:h-72 rounded-t-xl relative group"
        style={{ background: `url(${imgUrl})`, backgroundSize: "cover" }}
      >
        <div className="overlay items-center justify-center absolute top-0 left-0 w-full h-full bg-[#181818] bg-opacity-0 hidden group-hover:flex group-hover:bg-opacity-80 transition-all duration-500 ">
          <Link
            href={gitUrl}
            className="h-14 w-14 mr-2 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
          >
            <CodeBracketIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  cursor-pointer group-hover/link:text-white" />
          </Link>
          <Link
            href={isPreviewUrlList ? "#" : previewUrl}
            className="h-14 w-14 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
            onClick={handlePreviewClick}
          >
            <EyeIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  cursor-pointer group-hover/link:text-white" />
          </Link>
        </div>
      </div>
      <div className="text-white rounded-b-xl mt-3 bg-[#181818]py-6 px-4">
        <h5 className="text-xl font-semibold mb-2">{title}</h5>
        <p className="text-[#ADB7BE]">{description}</p>
      </div>
      {showCarousel && isPreviewUrlList && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative w-[75vw] h-[75vh]">
            <Image
              src={previewUrl[currentImageIndex]}
              alt={`Project image ${currentImageIndex + 1}`}
              layout="fill"
              objectFit="contain"
            />
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full text-2xl"
            >
              &lt;
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full text-2xl"
            >
              &gt;
            </button>
            <button
              onClick={handleCloseCarousel}
              className="absolute top-4 right-4 bg-white bg-opacity-50 p-2 rounded-full text-xl"
            >
              X
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-50 px-2 py-1 rounded-full">
              {currentImageIndex + 1} / {previewUrl.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;