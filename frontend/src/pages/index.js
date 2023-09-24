import { Fragment, useState, useRef } from "react";

import Link from "next/link";
import Head from "next/head";

import useSWR from "swr";

import { v4 as uuidv4 } from "uuid";

import { CldImage } from "next-cloudinary";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowRightIcon,
  XCircleIcon,
  ChevronDoubleDownIcon,
} from "@heroicons/react/24/solid";

import * as Skeletons from "@/components/Skeletons";
import * as AudioMessage from "@/components/AudioMessage";

const defineCoverImagesClasses = {
  centerImage: "row-start-1 row-span-2 lg:row-[span_8/span_8] lg:col-start-2",
  leftImage: "col-start-2 lg:col-start-1 lg:row-start-2 lg:row-span-6",
  rightImage: "row-start-2 col-start-2 lg:col-start-3 lg:row-start-2 lg:row-span-6",
};

const GridImagesWrapper = ({ children, orderCondition }) => {
  return (
    <div
      className={`relative overflow-hidden w-full ${
        orderCondition === "Apostle Arome at a major crusade in South Africa"
          ? defineCoverImagesClasses.centerImage
          : ""
      }${
        orderCondition === "Apostle Arome at a major crusade in Uganda"
          ? defineCoverImagesClasses.leftImage
          : ""
      }${
        orderCondition === "Apostle Arome at an apostolic conference in Ghana"
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

  const { data } = useSWR("http://localhost:1337/api/homepage");

  const homepageScreen_ref = useRef();
  const snippets_ref = useRef();

  return (
    <>
      <Head>
        <title>Home | The Best of Apostle Arome Osayi</title>
        <meta
          name="description"
          content="A compilation website of the most inspirational messages by Apostle Arome Osayi"
          key="description"
        />
        <meta
          name="description"
          content="Audio messages by Apostle Arome Osayi, from prayer to bible study topics"
          key="description"
        />
      </Head>

      <div
        ref={homepageScreen_ref}
        className="grow mt-6 lg:mt-12 xl:mt-16 px-5 lg:px-10 xl:p-0">
        <header className="relative flex flex-col xl:items-center gap-6 lg:gap-10 font-extrabold">
          <h1 className="max-w-[335px] lg:max-w-none lg:text-7xl xl:text-8xl xl:text-center">
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

          <div className="relative grid grid-cols-[minmax(141px,1fr)_minmax(176px,1fr)] lg:grid-cols-[244px_227px_244px] grid-rows-[repeat(2,100px)] lg:grid-rows-[repeat(7,minmax(38px,1fr))_28px] xl:justify-center gap-4 lg:gap-y-0">
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
                      className="rounded-lg object-cover"
                    />
                  )}
                </GridImagesWrapper>
              </Fragment>
            ))}

            <div className="absolute -bottom-[31px] left-[27px] lg:left-[135px] lg:bottom-[14px] p-3 bg-white-300 rounded">
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
          <Dialog.Trigger className="relative hidden xl:block w-full mt-20 uppercase font-semibold text-xs tracking-wide cursor-pointer z-10">
            <span>Discover latest messages</span>
            <ChevronDoubleDownIcon className="w-7 m-auto pt-6 animate-bounce" />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="xl:bg-overlay-snippets">
              <Dialog.Content className="xl:mt-0 xl:mb-2 xl:w-full xl:fixed xl:right-0 xl:bottom-0 xl:z-20 xl:flex xl:flex-col xl:gap-4">
                <Dialog.Close className="xl:m-auto flex items-center gap-2 text-white-300">
                  <XCircleIcon className="w-5 cursor-pointer" />
                  <span>Close latest</span>
                </Dialog.Close>
                <AudioMessage.Snippets />
              </Dialog.Content>
            </Dialog.Overlay>
          </Dialog.Portal>
        </Dialog.Root>

        <main ref={snippets_ref} className="mt-20 mb-6 xl:hidden flex flex-col gap-4">
          <div className="xl:hidden flex items-center justify-between">
            <p className="bg-white-300 px-3 py-2 text-xs lg:text-sm text-black-300 rounded-full">
              Latest messages
            </p>
            <Link href="/browse" className="flex items-center gap-2 cursor-pointer">
              <span className="text-xs lg:text-sm">View more</span>
              <ArrowRightIcon className="w-4 lg:w-5" />
            </Link>
          </div>

          <AudioMessage.Snippets />
        </main>
      </div>
    </>
  );
}
