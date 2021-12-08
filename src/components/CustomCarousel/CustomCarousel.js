import React, { useEffect, useState } from "react";
import "./CustomCarousel.scss";
import useFetch from "../../utilities/helper/customHooks";


//component for showing slider images
function CustomCarousel() {
  const [data, loading = false, error] = useFetch(
    "http://localhost:3000/banners"
  );
  const [imageData, setImageData] = useState({});
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setImageData(data && data[0]);
  }, [data]);

  const onClickArrow = (acc) => {
    let newIndex =
      index + acc >= data.length
        ? 0
        : index + acc < 0
        ? data.length - 1
        : index + acc;
    setImageData(data && data[newIndex]);
    setIndex(newIndex);
  };

  useEffect(() => {
    let interval = setInterval(() => {
      let newIndex = data && index + 1 < data.length ? index + 1 : 0;
      setImageData(data && data[newIndex]);
      setIndex(newIndex);
    }, 3000);
    return () => {
      clearInterval(interval);
    };
    return;
  }, [data, index]);

  const onClickDot = (e) => {
    setIndex(e.target.value - 1);
    setImageData(data && data[e.target.value - 1]);
  };
  return (
    <section className="center-display">
      <div className="carousel">
        {loading ? (
          <div className="base content-loader">
            <div className="base-text-loading">
              {error ? "Error" : "Loading..."}
            </div>
          </div>
        ) : !error ? (
          <>
            <div className="arrow" onClick={() => onClickArrow(-1)}>
            <span class="prev">PREV</span>
            </div>
            {imageData && (
              <img
                className="carousel-image"
                src={
                  imageData ? imageData.bannerImageUrl : data[0].bannerImageUrl
                }
                alt={
                  imageData ? imageData.bannerImageAlt : data[0].bannerImageAlt
                }
              />
            )}
            {data && data.length && imageData && (
              <div className="slick-dots">
                <ul className="slick-ul">
                  {data.map((el) => (
                    <li
                      className={
                        el.id === imageData.id
                          ? "slick-li-active slick-li "
                          : "slick-li"
                      }
                      key={el.id}
                      value={el.order}
                      onClick={(e) => onClickDot(e)}
                    ></li>
                  ))}
                </ul>
              </div>
            )}
            <div className="arrow" onClick={() => onClickArrow(1)}>
              <span class="next">NEXT</span>
            </div>
          </>
        ) : (
          <div className="base content-loader">
            <div className="base-text-loading">
              {error ? "Error" : "Loading..."}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
export default React.memo(CustomCarousel);
