import React from "react";
import { Tag } from "lucide-react";

const SidebarTags = () => {
  const tags = ["HTML", "CSS", "JS"];

  return (
    <div className="aside__tags">
      <h3>Tags</h3>
      <ul className="aside__tags__list">
        {tags.length > 0 ? (
          tags.map((tag) => (
            <li key={tag}>
              <button className="btn btn-secondary icon-wrapper">
                <Tag />
                {tag}
              </button>
            </li>
          ))
        ) : (
          <p>No tags added at the moment</p>
        )}
      </ul>
    </div>
  );
};

export default SidebarTags;
