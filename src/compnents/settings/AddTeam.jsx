import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { createTeamMember } from "../../actions/usersActions";
import { getPresets } from "../../actions/settingsActions";
import TableCard from "../layout/TableCard";
// reactstrap
import { Table, Input, CustomInput, Button } from "reactstrap";
// icons
import { ReactComponent as Done } from "../../Icons/done.svg";
import { ReactComponent as Edit } from "../../Icons/edit.svg";
import { ReactComponent as Close } from "../../Icons/close.svg";
import Spinner from "../layout/Spinner";

function AddTeam({ createTeamMember, getPresets, presets }) {
  const [loading, setLoading] = useState(true);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "",
    team: "",
    department: "",
    toggl: false,
    asana: false,
    greeInVoice: false
  });
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await getPresets();
      setLoading(false);
    };
    getData();
  }, [getPresets]);

  const onInputChange = e => {
    console.log(e);
    console.log(e.target.value);
    console.log(e.target.name);

    setNewMember({
      ...newMember,
      email: email.toLowerCase(),
      [e.target.name]: e.target.value
    });
  };
  const onCheckboxChange = e =>
    setNewMember({
      ...newMember,
      [e.target.id]: e.target.checked
    });

  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);
    createTeamMember(newMember);
  };
  useEffect(() => {
    if (Object.keys(presets).length > 0) {
      setNewMember(c => ({
        ...c,
        role: presets.roles.split(",")[0],
        team: presets.teams.split(",")[0],
        department: presets.departements.split(",")[0]
      }));
    }
  }, [presets, presets.roles, presets.teams, presets.departements]);

  const {
    name,
    email,
    role,
    team,
    department,
    toggl,
    asana,
    greeInVoice
  } = newMember;
  return (
    <div>
      <h3>Settings - Team member</h3>
      <form onSubmit={onSubmit}>
        <TableCard>
          <div className="d-flex justify-content-between table_card_header">
            <div className="d-flex">
              <Button
                // tag={Link}
                // to={`/clients/:id/edit`}
                size="lg"
                className="btn-circle table-card-button mr-2"
                disabled
              >
                <Edit />
              </Button>
              <Button
                size="lg"
                className="btn-circle table-card-button "
                type="submit"
              >
                <Done />
              </Button>
            </div>
            <div>
              <Link to="/settings/team">
                <Close />
              </Link>
            </div>
          </div>
          {loading ? (
            <Spinner />
          ) : (
            <fieldset disabled={loading}>
              <Table borderless className="table_card_table">
                <thead>
                  <tr>
                    <th width="15%">name</th>
                    <th width="15%">e-mail</th>
                    <th width="20%">role</th>
                    <th width="20%">team</th>
                    <th width="20%">department </th>
                    <th className="text-center">toggle</th>
                    <th className="text-center">asana</th>
                    <th className="text-center">greeInVoice</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td width="15%">
                      <Input
                        onChange={onInputChange}
                        name="name"
                        value={name}
                        required
                      />
                    </td>
                    <td width="15%">
                      <Input
                        onChange={onInputChange}
                        name="email"
                        value={email}
                        required
                      />
                    </td>
                    <td>
                      <Input
                        onChange={onInputChange}
                        name="role"
                        value={role}
                        type="select"
                        required
                      >
                        {presets.roles &&
                          presets.roles
                            .split(",")
                            .map(role => (
                              <option value={role.trim()}>{role}</option>
                            ))}
                      </Input>
                    </td>
                    <td>
                      <Input
                        onChange={onInputChange}
                        name="team"
                        type="select"
                        value={team}
                        required
                      >
                        {presets.teams &&
                          presets.teams
                            .split(",")
                            .map(team => (
                              <option value={team.trim()}>{team}</option>
                            ))}
                      </Input>
                    </td>
                    <td>
                      <Input
                        onChange={onInputChange}
                        name="department"
                        type="select"
                        value={department}
                        required
                      >
                        {presets.departements &&
                          presets.departements
                            .split(",")
                            .map(dep => (
                              <option value={dep.trim()}>{dep}</option>
                            ))}
                      </Input>
                    </td>
                    <td className="text-center">
                      <CustomInput
                        type="checkbox"
                        id="toggl"
                        onChange={onCheckboxChange}
                        checked={toggl}
                      />
                    </td>
                    <td className="text-center">
                      <CustomInput
                        type="checkbox"
                        id="asana"
                        onChange={onCheckboxChange}
                        checked={asana}
                      />
                    </td>
                    <td className="text-center">
                      <CustomInput
                        type="checkbox"
                        id="greeninvoice"
                        onChange={onCheckboxChange}
                        checked={greeInVoice}
                      />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </fieldset>
          )}
        </TableCard>
      </form>
    </div>
  );
}
const mapstateToProps = state => ({ presets: state.settings.presets });
export default connect(
  mapstateToProps,
  { createTeamMember, getPresets }
)(AddTeam);
