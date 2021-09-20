import Image from "react-bootstrap/Image";
import "../styles/image_viewer.css";
import { useSelector } from "react-redux";
import { selectImages } from "../store/images";
import { selectActiveTopic } from "../store/topics";

const ImageViewer = () => {
  const ActiveTopic = useSelector(selectActiveTopic);
  const ImagesState = useSelector(selectImages);

  const topicImages = ImagesState.images[ActiveTopic];

  if (ImagesState.isLoading === true) {
    return <div className="image-loader"></div>;
  }

  if (ImagesState.images.length === 0 || !topicImages) {
    return <div className="image-error">Failed to load images</div>;
  }

  const topRow = topicImages.slice(0, topicImages.length / 2);
  const bottomRow = topicImages.slice(
    topicImages.length / 2,
    topicImages.length
  );

  const hideSideBar = () => {
    const container = document.getElementById("image_gallary");
    const sidenav = document.getElementsByClassName("sidenav")[0];
    const xIndex = container.scrollLeft;
    if (xIndex >= 300) {
      sidenav.style.display = "none";
      container.style.left = 0;
      container.style.width = "100%";
    } else {
      container.scrollLeft = 0;
      container.style.left = "20%";
      container.style.width = "100%";
      sidenav.style.display = "block";
    }
  };

  const scroll = async (direction) => {
    await smoothScroll("image_gallary", direction, 320);
    hideSideBar();
  };

  const smoothScroll = (id, direction, amount) => {
    const container = document.getElementById(id);
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      container.scrollLeft += direction === "left" ? -10 : 10;
      scrollAmount += 10;
      if (scrollAmount >= amount) {
        window.clearInterval(slideTimer);
      }
    }, 15);
  };

  return (
    <div className="image_viewer" id="image_gallary">
      <div className="d-flex flex-nowrap">
        {topRow.map((image, index) => {
          return <GallaryImage image={image} key={image.id} />;
        })}
      </div>
      <div className="d-flex flex-nowrap">
        {bottomRow.map((image, index) => {
          return <GallaryImage image={image} key={image.id} />;
        })}
      </div>
      <button
        className="right nav-button"
        type="button"
        onClick={() => scroll("right")}
      >
        {">"}
      </button>
      <button
        className="left nav-button"
        type="button"
        onClick={() => scroll("left")}
      >
        {"<"}
      </button>
    </div>
  );
};

const GallaryImage = ({ image }) => {
  return (
    <div className="col-4" key={image.id.toString()}>
      <Image
        src={image.urls.small}
        key={image.id.toString()}
        className="d-block w-100 gallary_image"
        alt=""
      />
    </div>
  );
};
export default ImageViewer;
