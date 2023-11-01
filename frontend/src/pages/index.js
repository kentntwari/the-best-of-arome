import { Fragment, useState, useRef } from "react";
import Link from "next/link";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";
import { NextSeo } from "next-seo";
import { CldImage } from "next-cloudinary";
import * as Dialog from "@radix-ui/react-dialog";
import * as Skeletons from "@/components/Skeletons";
import * as AudioMessage from "@/components/AudioMessage";
import {
  ArrowRightIcon,
  XCircleIcon,
  ChevronDoubleDownIcon,
} from "@heroicons/react/24/solid";

const defineCoverImagesClasses = {
  centerImage:
    "row-start-1 row-span-2 base:row-span-6 base:col-start-2 md:row-[span_8/span_8] ",
  leftImage:
    "col-start-2 base:col-start-1 base:row-start-2 base:row-span-4 md:row-start-2 md:row-span-6",
  rightImage:
    "row-start-2 col-start-2 base:col-start-3 base:row-start-2 base:row-span-4 md:row-start-2 md:row-span-6",
};

const GridImagesWrapper = ({ children, orderCondition }) => {
  return (
    <div
      className={`relative overflow-hidden w-full ${
        orderCondition === "Apostle Arome Osayi at a major crusade in South Africa"
          ? defineCoverImagesClasses.centerImage
          : ""
      }${
        orderCondition === "Apostle Arome Osayi at a major crusade in Uganda"
          ? defineCoverImagesClasses.leftImage
          : ""
      }${
        orderCondition === "Apostle Arome Osayi at an apostolic conference in Ghana"
          ? defineCoverImagesClasses.rightImage
          : ""
      }`}>
      {children}
    </div>
  );
};

export default function Home() {
  //when image resolves to an error
  const [showSkeleton, setShowSkeleton] = useState(false);

  const { data } = useSWR(`${process.env.NEXT_PUBLIC_RESSOURCES_URL}/api/homepage`);

  const homepageScreen_ref = useRef();
  const snippets_ref = useRef();

  return (
    <>
      <NextSeo title="Home" />

      <div
        ref={homepageScreen_ref}
        className="grow mt-6 md:mt-12 md:px-10 lg:mt-16 px-5 lg:p-0">
        <header className="relative flex flex-col md:items-center gap-6 lg:gap-10 font-extrabold">
          <h1 className="max-w-[335px] sm:max-w-none sm:text-6xl md:max-w-none md:text-center umd:text-7xl xl:text-8xl">
            {data?.coverText ? (
              data?.coverText
            ) : (
              <>
                <span className="font-medium italic">Rekindling</span>
                <br />
                The Flames of Revival
              </>
            )}
          </h1>

          <div
            className="relative grid grid-cols-[minmax(141px,1fr)_minmax(176px,1fr)] base:grid-cols-3 md:grid-cols-[244px_227px_244px] 
          grid-rows-[repeat(2,100px)] base:grid-rows-[20px_repeat(4,minmax(40px,1fr))_20px] md:grid-rows-[repeat(7,minmax(38px,1fr))_28px] 
          xl:justify-center gap-2 md:gap-y-0">
            {!data && (
              <>
                <Skeletons.ImageSkeleton
                  className={defineCoverImagesClasses.centerImage}
                />
                <Skeletons.ImageSkeleton className={defineCoverImagesClasses.leftImage} />
                <Skeletons.ImageSkeleton
                  className={defineCoverImagesClasses.rightImage}
                />
              </>
            )}

            {data?.coverImages?.map(({ width, height, altText, public_id }) => (
              <Fragment key={uuidv4()}>
                <GridImagesWrapper orderCondition={altText}>
                  {showSkeleton ? (
                    <Skeletons.ImageSkeleton width="w-full" height="h-full" />
                  ) : (
                    <CldImage
                      deliveryType="upload"
                      src={public_id}
                      sizes="(max-width: 768px) 50vw, 33vw"
                      fill={true}
                      loading="lazy"
                      rawTransformations={["c_limit,w_250"]}
                      alt={altText}
                      onError={() => setShowSkeleton(true)}
                      onLoad={() => setShowSkeleton(true)}
                      onLoadingComplete={() => setShowSkeleton(false)}
                      className="rounded-lg object-cover object-[50%_20%]"
                    />
                  )}
                </GridImagesWrapper>
              </Fragment>
            ))}

            <div className="absolute -bottom-[31px] left-[27px] base:-bottom-[20px] base:left-[80px] md:left-[135px] md:bottom-[14px] p-3 bg-white-300 rounded">
              <span className="mb-2 block uppercase font-normal text-xs text-neutral-200">
                Featuring
              </span>
              <span className="font-normal text-sm lg:text-base text-black-300">
                Apostle Arome Osayi
              </span>
            </div>
          </div>
        </header>

        <Dialog.Root>
          <Dialog.Trigger className="relative hidden md:block w-full mt-20 uppercase font-semibold text-xs tracking-wide cursor-pointer z-10">
            <span>Discover latest messages</span>
            <ChevronDoubleDownIcon className="w-7 m-auto pt-6 animate-bounce" />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="md:bg-overlay-snippets">
              <Dialog.Content className="md:mt-0 md:mb-2 md:w-full md:fixed md:right-0 md:bottom-0 md:z-20 md:flex md:flex-col md:gap-4">
                <Dialog.Close className="md:m-auto flex items-center gap-2 text-white-300">
                  <XCircleIcon className="w-5 cursor-pointer" />
                  <span>Close latest</span>
                </Dialog.Close>
                <AudioMessage.Snippets />
              </Dialog.Content>
            </Dialog.Overlay>
          </Dialog.Portal>
        </Dialog.Root>

        <main ref={snippets_ref} className="mt-20 mb-6 md:hidden flex flex-col gap-4">
          <div className="md:hidden flex items-center justify-between">
            <p className="bg-white-300 px-3 py-2 text-xs md:text-sm text-black-300 rounded-full">
              Latest messages
            </p>
            <Link href="/browse" className="flex items-center gap-2 cursor-pointer">
              <span className="text-xs md:text-sm">View more</span>
              <ArrowRightIcon className="w-4 md:w-5" />
            </Link>
          </div>

          <AudioMessage.Snippets />
        </main>
      </div>
    </>
  );
}
