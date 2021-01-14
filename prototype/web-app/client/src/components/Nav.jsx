import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import SideNav, {NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';


const Nav = (props) => {

    const [expanded, setExpanded] = useState(false);
    

    let history = useHistory();

    function red(params) {
        setExpanded(false);
        history.push(params);
        }
    
        
    return (<div>
            <SideNav expanded={expanded} onToggle={() => setExpanded(!expanded)} style={{background: "#90C8EA"}}
                onSelect={(selected) => {
                    // Add your code here
                    red(selected);
                }}>
                <SideNav.Toggle style={{background: "#39505D",
                                        width: "100%"
                }} />
                <SideNav.Nav defaultSelected={history.location.pathname}>
                    {props.pageList.map((item) => {
                    return(    
                    <NavItem key={item.page} eventKey={item.PagePath}>
                        <NavIcon>
                            <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                            {item.icon()}
                        </NavIcon>
                        <NavText>
                            <b style={{color: "black"}}>
                                {item.PageName}
                            </b>
                        </NavText>
                    </NavItem>
                    );
                    })}
                </SideNav.Nav>
            </SideNav>
        </div> );
}

export default Nav;