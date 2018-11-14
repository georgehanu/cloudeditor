import React from "react";
import { connect } from "react-redux";
import assign from "object-assign";
import { withNamespaces } from "react-i18next";
import ProjectItem from "../components/project/ProjectItem";

const Project = props => {
  return (
    <div className="Projects">
      <ul>
        <ProjectItem
          class="printqicon-cloud-saveproject"
          tooltip={{
            title: "Save",
            description: "Save project"
          }}
          clicked={props.setMoveable}
        />
        <ProjectItem
          class="printqicon-cloud-loadproject"
          tooltip={{
            title: "Load",
            description: "Load project"
          }}
          clicked={props.setResizable}
        />
      </ul>
    </div>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

const ProjectPlugin = connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces("project")(Project));

module.exports = {
  Project: assign(ProjectPlugin, {
    disablePluginIf:
      "{store().getState().project.title==='Empty Project!!@!!@!@'}",
    SideBar: {
      position: 6,
      priority: 1,
      text: "Save/Load Project",
      icon: "printqicon-cloud-loadproject",
      showMore: true,
      tooltip: { title: "Save/Load", description: "Save/Load projects" },
      showPaneBackground: false,
      paneBackgroundClass: "PaneProjects"
    }
  })
};
