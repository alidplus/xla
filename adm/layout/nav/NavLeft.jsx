import React from 'react';
import { useRouter } from 'next/router'
import {
  ListGroup,
  ListGroupItem
} from 'atoms';

import navigations from 'constants/navigations';

function NavLeft(props) {
  const router = useRouter()
  const { route: activeLink } = router
  return (
    <>
      <h4 className="headline">Menu</h4>
      <div className="wrapper-list-group">
        <ListGroup flush className="list-group-nav-left" tag="div">
          {navigations.map((item, k) => {
            const isActive = activeLink === item.path ? true : false;
            return (
              <ListGroupItem
                key={item.path}
                active={isActive}
                className="text-nowrap"
                tag="a"
                href={`${item.path}?`}
              >
                {React.createElement(item.icon, { className: "me-2", fw: true })}
                {item.label}
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </div>
      {/*<h4 className="headline">UI Elements</h4>
      <div className="wrapper-list-group">
        <ListGroup flush className="list-group-nav-left" tag="div">
          {SUBMENUS.map((subItem, k) => {
            const isActive = activeLink === subItem.name ? true : false;
            const activeMenus = activeLink && activeLink.split('.');
            return (
              (!subItem.subLinks && (
                <ListGroupItem
                  key={`k${k}`}
                  active={isActive}
                  tag={subItem.as}
                  href={subItem.href}
                >
                  {subItem.icon && <i className={subItem.icon}></i>}&nbsp;
                  {subItem.label}
                </ListGroupItem>
              )) || (
                <ListGroupItem
                  key={`ks${k}`}
                  tag="div"
                  active={activeMenus[0] ? true : false}
                >
                  <a
                    href={subItem.href}
                    className="dropdown-toggle"
                    id={`toggleCollapser-${k}`}
                  >
                    {subItem.icon && <i className={subItem.icon}></i>}&nbsp;
                    {subItem.label}
                  </a>
                  <UncontrolledCollapse
                    toggler={`toggleCollapser-${k}`}
                    // isOpen={activeMenus[1] ? true : false}
                  >
                    <Nav vertical className="mt-2">
                      {subItem.subLinks.map((subs, l) => {
                        const isSubActive =
                          activeMenus && activeMenus[1] === subs.name
                            ? true
                            : false;

                        return (
                          <NavItem key={`l${l}`} active={isSubActive === true}>
                            <NavLink href={subs.href}>{subs.label}</NavLink>
                          </NavItem>
                        );
                      })}
                    </Nav>
                  </UncontrolledCollapse>
                </ListGroupItem>
              )
            );
          })}
        </ListGroup>
      </div>*/}
    </>
  );
}

export default NavLeft;
