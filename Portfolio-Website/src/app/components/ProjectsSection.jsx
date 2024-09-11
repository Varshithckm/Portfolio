"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "React Portfolio Website",
    description: "Project 1 description",
    image: "/images/projects/1.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/adxthyx/Portfolio-Website/",
    previewUrl: "/",
  },
  {
    id: 2,
    title: "Video Sharing Platform",
    description: "Project 2 description",
    image: "/images/projects/2.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Varshithckm/Video_sharing",
    previewUrl: ["/images/projects/2.png","/images/projects/2_0.png","/images/projects/2_1.png"],
  },
  {
    id: 3,
    title: "Campus Hub",
    description: "Project 3 description",
    image: "/images/projects/3.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Varshithckm/Hub_campus",
    previewUrl: ["/images/projects/3.png","/images/projects/3_0.png"],
  },
  {
    id: 4,
    title: "Assistive Device for Blind using VLM",
    description: "Project 4 description",
    image: "/images/projects/4.png",
    tag: ["All", "ML"],
    gitUrl: "https://github.com/adxthyx/BLIND_ASSIST_2.0",
    previewUrl: "https://drive.google.com/file/d/1aiipy1nlBRCUTv2ltG9uRYtgdqylTlJU/view",
  },

  
];

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        My Projects
      </h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Web"
          isSelected={tag === "Web"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="ML"
          isSelected={tag === "ML"}
        />
      </div>
      <ul ref={ref} className="grid md:grid-cols-2 gap-8 md:gap-12">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
