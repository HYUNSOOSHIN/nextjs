// 참고: https://velog.io/@yesbb/Nextjs에서-이미지-최적화하기#2이미지-레이지-로딩하기-
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";
import profilePic from "../public/images/city.jpeg";

const EXAMPLE_IMAGE =
  "https://d3flaz883pr9hy.cloudfront.net/upload/1663754072923_%EB%A7%A8%EC%9C%A0_%EB%A1%9C%EA%B3%A0.jpg";

const ImageLazyLoading = (props) => {
  return (
    <>
      <div className="container">
        <h1>Image Lazy Loading</h1>
        <ul className="image-list">
          <li>
            <h2>1. 로컬 이미지인 경우</h2>
            <Image
              src={profilePic}
              alt="local img"
              width={500}
              height={500}
              loading="lazy"
              placeholder="blur"
            />
          </li>
          <li>
            <h2>2. 외부 이미지인 경우</h2>
            <Image
              src={EXAMPLE_IMAGE}
              alt="external img"
              width={500}
              height={500}
              loading="lazy"
              placeholder="blur"
              blurDataURL={props.imageProps.blurDataURL}
            />
          </li>
        </ul>
      </div>

      <style jsx>{`
        .container {
          padding: 10px;
        }
      `}</style>
    </>
  );
};

export default ImageLazyLoading;

export const getStaticProps = async () => {
  const { base64, img } = await getPlaiceholder(EXAMPLE_IMAGE, { size: 10 });

  return {
    props: {
      imageProps: {
        ...img,
        blurDataURL: base64,
      },
    },
  };
};
