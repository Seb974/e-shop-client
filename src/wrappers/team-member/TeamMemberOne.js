import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import SectionTitleTwo from "../../components/section-title/SectionTitleTwo";
import teamMemberData from "../../data/team-members/team-member-one.json";
import TeamMemberOneSingle from "../../components/team-member/TeamMemberOneSingle";
import AgentActions from "../../services/AgentActions";
import { isDefinedAndNotVoid } from "../../helpers/utils";

const TeamMemberOne = ({ spaceTopClass, spaceBottomClass }) => {

  const [team, setTeam] = useState([]);

  useEffect(() => fetchTeam(), []);

  const fetchTeam = () => {
      AgentActions
        .findAll()
        .then(response => setTeam(response));
  };

  return (
    <div
      className={`team-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        {/* section title */}
        <SectionTitleTwo
          titleText="Notre équipe"
          subTitleText="Lorem ipsum dolor sit amet conse ctetu."
          positionClass="text-center"
          spaceClass="mb-60"
        />

        <div className="row">
          { isDefinedAndNotVoid(team) && 
            team.sort(() => Math.random() - 0.5)
                .filter((member, i) => i < 4)
                .map((single, key) => {
                    return (
                        <TeamMemberOneSingle
                            data={single}
                            spaceBottomClass="mb-30"
                            key={key}
                        />
                    );
            })}
        </div>
      </div>
    </div>
  );
};

TeamMemberOne.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default TeamMemberOne;
