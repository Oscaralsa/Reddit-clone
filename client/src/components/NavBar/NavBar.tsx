import React, { useState } from "react";
import { connect } from "react-redux";

import RedditLogo from "../../assets/images/reddit-logo.png";
import Coin from "../../assets/images/coin.png";

import SignForm from "../SignForm";
import BasicModal from "../Modal/BasicModal";

import { logout } from "../../actions/authAction"

import { DropdownButton, Dropdown, Button } from "react-bootstrap";
import {
  faIgloo,
  faChartLine,
  faChartBar,
  faColumns,
  faCommentDots,
  faPencilAlt,
  faEnvelope,
  faSearch,
  faUser,
  faCoins,
  faPlusCircle,
  faQuestionCircle,
  faDoorOpen,
  faUserCircle,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./NavBar.scss";
import { bindActionCreators, Dispatch, AnyAction } from "redux";

function NavBar(props: { token: string; logout: any; }) {
  const { token, logout } = props;

  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(<></>);
  const [showTitleModal, setShowTitleModal] = useState(false);
  const [titleModal, setTitleModal] = useState(<></>);
  const [showFooterModal, setShowFooterModal] = useState(false);
  const [footerModal, setFooterModal] = useState(<></>);

  const handleModal = (content: JSX.Element) => {
    setShowModal(!showModal);
    setShowTitleModal(false);
    setTitleModal(<></>);
    setShowFooterModal(false);
    setFooterModal(<></>);
    setContentModal(content);
  };

  const [weekValue, setWeekValue] = useState(
    <>
      <FontAwesomeIcon icon={faIgloo} />
      {token ? "⠀Home⠀⠀⠀⠀⠀" : ""}
    </>
  );
  const [userDropdownValue, setUserDropdownValue] = useState(
    <>
      <FontAwesomeIcon icon={faUser} />
      ⠀⠀
    </>
  );

  return (
    <div className="header">
      <div className="header__logo">
        <img src={RedditLogo} alt="logo" />
        <h4>reddit</h4>
      </div>

      {token ? (
        <div className="header__input__section">
          <DropdownButton
            className="header__input__section__dropdown"
            //bsStyle="link"
            //pullRight={true}
            title={weekValue}
          >
            <Dropdown.Item
              onClick={() =>
                setWeekValue(
                  <>
                    <FontAwesomeIcon icon={faIgloo} />
                    ⠀Home⠀⠀⠀⠀
                  </>
                )
              }
            >
              <FontAwesomeIcon icon={faIgloo} />
              ⠀Home⠀⠀⠀⠀
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                setWeekValue(
                  <>
                    <FontAwesomeIcon icon={faChartLine} />
                    ⠀Popular⠀⠀⠀⠀
                  </>
                )
              }
            >
              <FontAwesomeIcon icon={faChartLine} />
              ⠀Popular⠀⠀⠀⠀⠀⠀⠀⠀⠀
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                setWeekValue(
                  <>
                    <FontAwesomeIcon icon={faChartBar} />
                    ⠀All⠀⠀⠀⠀
                  </>
                )
              }
            >
              <FontAwesomeIcon icon={faChartBar} />
              ⠀All⠀⠀⠀⠀⠀⠀⠀
            </Dropdown.Item>
          </DropdownButton>
        </div>
      ) : (
        ""
      )}
      {token ? (
        <div className="header__search__bar">
          <FontAwesomeIcon icon={faSearch} />
          <input type="text" placeholder="Search" />
        </div>
      ) : (
        <div className="header__search__bar" style={{ left: "30px" }}>
          <FontAwesomeIcon icon={faSearch} />
          <input type="text" placeholder="Search" />
        </div>
      )}

      {token ? (
        <>
          <div className="icons__left">
            <FontAwesomeIcon icon={faChartLine} />
            <FontAwesomeIcon icon={faChartBar} />
            <FontAwesomeIcon icon={faColumns} />
          </div>
          <div className="icons__right">
            <FontAwesomeIcon icon={faCommentDots} />
            <FontAwesomeIcon icon={faEnvelope} />
            <FontAwesomeIcon icon={faPencilAlt} />
          </div>

          <div className="get__coins">
            <img src={Coin} height="20px" alt="" />
            <span>Get Coins</span>
          </div>
        </>
      ) : (
        ""
      )}

      <div className="header__user__section">
        {!token ? (
          <div className="header__user__section__buttons">
            <Button
              className="header__user__section__buttons__only"
              type="submit"
              variant="outline-primary"
              onClick={() =>
                handleModal(
                  <SignForm
                    setShowModal={setShowModal}
                    setTitleModal={setTitleModal}
                    setFooterModal={setFooterModal}
                    setShowFooterModal={setShowFooterModal}
                    setShowTitleModal={setShowTitleModal}
                    signUpType={false}
                  />
                )
              }
            >
              LOG IN
            </Button>
            <Button
              className="header__user__section__buttons__only"
              type="submit"
              variant="primary"
              onClick={() =>
                handleModal(
                  <SignForm
                    setShowModal={setShowModal}
                    setTitleModal={setTitleModal}
                    setFooterModal={setFooterModal}
                    setShowFooterModal={setShowFooterModal}
                    setShowTitleModal={setShowTitleModal}
                    signUpType={true}
                  />
                )
              }
            >
              SIGN UP
            </Button>
          </div>
        ) : (
          ""
        )}
        <div className="header__user__section__dropdown">
          <DropdownButton
            className="header__user__section__dropdown"
            //bsStyle="link"
            //pullRight={true}
            title={userDropdownValue}
          >
            {token ? (
              <>
                <Dropdown.Item
                  onClick={() =>
                    setUserDropdownValue(
                      <>
                        <FontAwesomeIcon icon={faUserCircle} />
                        ⠀My Profile⠀⠀⠀⠀⠀
                      </>
                    )
                  }
                >
                  <FontAwesomeIcon icon={faUserCircle} />
                  ⠀My Profile⠀⠀⠀⠀⠀
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() =>
                    setUserDropdownValue(
                      <>
                        <FontAwesomeIcon icon={faCog} />
                        ⠀User Settings⠀⠀⠀
                      </>
                    )
                  }
                >
                  <FontAwesomeIcon icon={faCog} />
                  ⠀User Settings⠀⠀⠀
                </Dropdown.Item>
                <Dropdown.Divider />
              </>
            ) : (
              ""
            )}
            <Dropdown.Item
              onClick={() =>
                setUserDropdownValue(
                  <>
                    <FontAwesomeIcon icon={faCoins} />
                    ⠀Reddit Coins⠀⠀⠀⠀⠀
                  </>
                )
              }
            >
              <FontAwesomeIcon icon={faCoins} />
              ⠀Reddit Coins⠀⠀⠀⠀⠀
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                setUserDropdownValue(
                  <>
                    <FontAwesomeIcon icon={faPlusCircle} />
                    ⠀Reddit Premium⠀⠀⠀
                  </>
                )
              }
            >
              <FontAwesomeIcon icon={faPlusCircle} />
              ⠀Reddit Premium⠀⠀⠀
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                setUserDropdownValue(
                  <>
                    <FontAwesomeIcon icon={faQuestionCircle} />
                    ⠀Help Center⠀⠀⠀
                  </>
                )
              }
            >
              <FontAwesomeIcon icon={faQuestionCircle} />
              ⠀Help Center⠀⠀⠀
            </Dropdown.Item>
            <Dropdown.Divider />
            {token ? (
              <Dropdown.Item
                onClick={() =>
                  logout()
                }
              >
                <FontAwesomeIcon icon={faDoorOpen} />
                ⠀Log Out
              </Dropdown.Item>
            ) : (
              <Dropdown.Item
                onClick={() =>
                  handleModal(
                    <SignForm
                      setShowModal={setShowModal}
                      setTitleModal={setTitleModal}
                      setFooterModal={setFooterModal}
                      setShowFooterModal={setShowFooterModal}
                      setShowTitleModal={setShowTitleModal}
                      signUpType={false}
                    />
                  )
                }
              >
                <FontAwesomeIcon icon={faDoorOpen} />
                ⠀Log In / Sign Up⠀
              </Dropdown.Item>
            )}
          </DropdownButton>
        </div>

        {/** Modal */}
        <BasicModal
          show={showModal}
          setShow={setShowModal}
          titleModal={titleModal}
          footerModal={footerModal}
          showFooterModal={showFooterModal}
          showTitleModal={showTitleModal}
        >
          {contentModal}
        </BasicModal>
      </div>
    </div>
  );
}

const mapStateToProps = (state: { user: any; token: string }, props: any) => ({
  ...props,
  user: state.user,
  token: state.token,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators(
  {
    logout: logout
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
