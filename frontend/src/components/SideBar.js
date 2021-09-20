import { useEffect } from "react";
import "../styles/sidebar.css";
import "../styles/loader.css";
import { useSelector, useDispatch } from "react-redux";
import { selectTopics, updateTopic } from "../store/topics";
import { fetchImages } from "../store/images";

const SideBar = () => {
  const topicState = useSelector(selectTopics);
  const dispatch = useDispatch();
  useEffect(() => {
    if (topicState.activeTopic) {
      dispatch(fetchImages(topicState.activeTopic));
    }
  });

  const loadImages = (key) => {
    dispatch(updateTopic(key));
    dispatch(fetchImages(key));
    document.getElementsByClassName("image_viewer")[0].scrollLeft = 0;
  };

  return (
    <div className={"sidenav"} id="sidenav">
      {topicState.topics.length === 0 && !topicState.isLoading ? (
        <div className="topic-error">Failed to load topics</div>
      ) : (
        ""
      )}

      {topicState.isLoading ? <div className="topic-loader"></div> : ""}

      {topicState.topics.map((topic) => {
        return (
          <button
            key={topic.id}
            onClick={() => loadImages(topic.id)}
            id={topic.id}
            className={topic.id === topicState.activeTopic ? "active" : ""}
          >
            {topic.title}
          </button>
        );
      })}
    </div>
  );
};

export default SideBar;
