"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { UploadDropzone } from "react-uploader";
import { Uploader } from "uploader";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import LoadingDots from "../../components/LoadingDots";
import ResizablePanel from "../../components/ResizablePanel";
import appendNewToName from "../../utils/appendNewToName";
import downloadPhoto from "../../utils/downloadPhoto";
import DropDown from "../../components/DropDown";
import { themeType, themes } from "../../utils/dropdownTypes";

// Configuration for the uploader
const uploader = Uploader({
  apiKey: !!process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    ? process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    : "free",
});

const options = {
  maxFileCount: 1,
  mimeTypes: ["image/jpeg", "image/png", "image/jpg"],
  editor: { images: { crop: false } },
  styles: {
    colors: {
      primary: "#FFDE14", // Primary buttons & links
      error: "#d23f4d", // Error messages
      shade100: "#fff", // Standard text
      shade200: "#fffe", // Secondary button text
      shade300: "#fffd", // Secondary button text (hover)
      shade400: "#fffc", // Welcome text
      shade500: "#fff9", // Modal close button
      shade600: "#fff7", // Border
      shade700: "#fff2", // Progress indicator background
      shade800: "#fff1", // File item background
      shade900: "#ffff", // Various (draggable crop buttons, etc.)
    },
  },
};

export default function DreamPage() {
  const [originalPhoto, setOriginalPhoto] = useState(null);
  const [maskImage, setMaskImage] = useState(null);
  const [maskOnImage, setMaskOnImage] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [restoredLoaded, setRestoredLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [photoName, setPhotoName] = useState(null);
  const [theme, setTheme] = useState("Top Wear");
  const [prompt, setPrompt] = useState("a black shirt");

  const UploadDropZone = () => (
    <UploadDropzone
      uploader={uploader}
      options={options}
      onUpdate={(file) => {
        if (file.length !== 0) {
          setPhotoName(file[0].originalFile.originalFileName);
          setOriginalPhoto(file[0].fileUrl.replace("raw", "thumbnail"));
          generatePhoto(file[0].fileUrl.replace("raw", "thumbnail"));
        }
      }}
      width="670px"
      height="250px"
    />
  );

  async function generatePhoto(fileUrl) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    setLoading(true);
    const res = await fetch("/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl: fileUrl, theme, prompt }),
    });

    if (res.status !== 200) {
      setError(true);
      alert("We have too much traffic right now! Try the API on Replicate instead.");
    } else {
      let newPhoto = await res.json();
      setOriginalPhoto(newPhoto[0]);
      setMaskImage(newPhoto[1]);
      setMaskOnImage(newPhoto[2]);
      setGeneratedImage(newPhoto[3]);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1300);
  }

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  return (
    <div>
      <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
        <Header />
        <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-4 sm:mb-0 mb-8">
          <ResizablePanel>
            <AnimatePresence mode="wait">
              <motion.div className="flex justify-between items-center w-full flex-col mt-4">
                {!maskImage && (
                  <>
                    <div className="space-y-4 w-full max-w-sm">
                      <div className="flex mt-3 items-center space-x-3">
                        <Image
                          src="/number-1-white.svg"
                          width={30}
                          height={30}
                          alt="1 icon"
                        />
                        <p className="text-left font-medium">
                          Choose your clothing item.
                        </p>
                      </div>
                      <DropDown
                        theme={theme}
                        setTheme={(newTheme) =>
                          setTheme(newTheme )
                        }
                        themes={themes}
                      />
                    </div>
                    <div className="space-y-4 w-full max-w-sm">
                      <div className="flex mt-10 items-center space-x-3">
                        <Image
                          src="/number-2-white.svg"
                          width={30}
                          height={30}
                          alt="1 icon"
                        />
                        <p className="text-left font-medium">
                          Describe the clothing item you want to create.
                        </p>
                      </div>

                      <input
                        onChange={handleInputChange}
                        className="text-left font-medium w-full rounded p-2 text-black"
                        placeholder="Ex. a black shirt"
                      />
                    </div>
                    <div className="mt-4 w-full max-w-sm">
                      <div className="flex mt-6 w-96 items-center space-x-3">
                        <Image
                          src="/number-3-white.svg"
                          width={30}
                          height={30}
                          alt="1 icon"
                        />
                        <p className="text-left font-medium">
                          Upload a picture of a person.
                        </p>
                      </div>
                    </div>
                  </>
                )}
                {!originalPhoto &&
                  <p className="text-red-400 mt-5">*full body images produce much better results, also please use this tool ethically*</p>
                }
                {!originalPhoto && <UploadDropZone />}
                {originalPhoto && !maskImage && (
                  <img
                    alt="original photo"
                    src={originalPhoto}
                    className="rounded-2xl mt-4"
                  />
                )}
                {maskImage && maskOnImage && generatedImage && originalPhoto && (
                  <div className="flex sm:gap-4 lg:gap-8 sm:flex-row flex-col flex-wrap justify-center">
                    <div>
                      <h2 className="mb-1 font-medium text-lg">Original Image</h2>
                      <img
                        alt="Original Image"
                        src={originalPhoto}
                        className="rounded-2xl relative w-full h-96"
                      />
                    </div>
                    {/* <div className="sm:mt-0 mt-8">
                    <h2 className="mb-1 font-medium text-lg">Detected Clothing Mask</h2>
                    <a href={maskImage} target="_blank" rel="noreferrer">
                      <img
                        alt="Detected Clothing Mask"
                        src={maskImage}
                        className="rounded-2xl relative sm:mt-0 mt-2 cursor-zoom-in w-full h-96"
                      />
                    </a>
                  </div> */}
                    <div className="sm:mt-0 mt-8">
                      <h2 className="mb-1 font-medium text-lg">Clothing Detected (pink)</h2>
                      <a href={maskOnImage} target="_blank" rel="noreferrer">
                        <img
                          alt="Mask Over Original"
                          src={maskOnImage}
                          className="rounded-2xl relative sm:mt-0 mt-2 cursor-zoom-in w-full h-96"
                        />
                      </a>
                    </div>
                    <div className="sm:mt-0 mt-8">
                      <h2 className="mb-1 font-medium text-lg">Generated Image</h2>
                      <a href={generatedImage} target="_blank" rel="noreferrer">
                        <img
                          alt="Generated Image"
                          src={generatedImage}
                          className="rounded-2xl relative sm:mt-0 mt-2 cursor-zoom-in w-full h-96"
                        />
                      </a>
                    </div>
                  </div>
                )}
                {loading && (
                  <button
                    disabled
                    className="bg-pink-400 rounded-full text-white font-medium px-4 pt-2 pb-3 mt-8 w-40"
                  >
                    <span className="pt-4">
                      <LoadingDots color="white" style="large" />
                    </span>
                  </button>
                )}
                {error && (
                  <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mt-8"
                    role="alert"
                  >
                    <span className="block sm:inline">We have too much traffic right now! Try the API on <a className="underline" href="https://replicate.com/naklecha/fashion-ai">Replicate</a> instead.</span>
                    <br></br>
                  </div>
                )}
                {!error &&
                  <div className="flex space-x-2 mt-2 mb-4 justify-center">
                    {originalPhoto && !loading && (
                      <button
                        onClick={() => {
                          setOriginalPhoto(null);
                          setMaskImage(null);
                          setMaskOnImage(null);
                          setGeneratedImage(null);
                          setRestoredLoaded(false);
                          setError(null);
                        }}
                        className="bg-pink-500 rounded-full text-white font-medium px-4 py-2 mt-8 hover:bg-pink-500/80 transition"
                      >
                        Generate New Image
                      </button>
                    )}
                    {generatedImage && (
                      <button
                        onClick={() => {
                          downloadPhoto(
                            generatedImage,
                            appendNewToName("generated.png")
                          );
                        }}
                        className="bg-white rounded-full text-black border font-medium px-4 py-2 mt-8 hover:bg-gray-100 transition"
                      >
                        Download Generated Image
                      </button>
                    )}
                  </div>
                }
              </motion.div>
            </AnimatePresence>
          </ResizablePanel>
        </main>
        <Footer />
      </div>
    </div>

  );
}
