import styled from 'styled-components'
import {Link as LinkRouter} from 'react-router-dom'
import {Link as LinkScroll} from 'react-scroll'

export const Nav = styled.nav`
	//background: ${({scrollNav})=>(scrollNav?'#000':'transparent')};
	background: #000;
	height: 80px;
	//margin-top: -80px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1rem;
	position: sticky;
	top: 0;
	z-index: 10;

	@media screen and (max-width: 960px)
	{
		transition: 0.8s all ease;
	}
`
export const NavbarContainer = styled.div`
	display: flex;
	justify-content: space-between;
	height: 80px;
	z-index: 1;
	width: 100%;
	padding: 0 24px;
	max-width: 1100px;
`

export const NavLogo = styled(LinkRouter)`
	color: #fff;
	justify-self: flex-start;
	cursor: pointer;
	font-size: 1.5rem;
	display: flex;
	align-items: center;
	font-weight: bold;
	text-decoration: none;
	letter-spacing: 10px;
`

export const MobileIcon = styled.div`
	display: none;
	@media screen and (max-width: 768px)
	{
		display: block;
		position: absolute;
		top: 0;
		right: 0;
		transform: translate(-100%,60%);
		font-size:1.8rem;
		cursor: pointer;
		color: #fff;
	}
`
export const NavMenu = styled.ul`
	display: flex;
	list-style: none;
	text-align: center;
	align-items: center;
	margin-right: -22px;

	@media screen and (max-width: 768px)
	{
		display: none;
	}
`
export const NavItem = styled.li`
	height: 80px;
`
export const NavLinks = styled(LinkScroll)`
	color: #fff;
	display: flex;
	align-items: center;
	text-decoration: none;
	padding: 0 1rem;
	height: 100%;
	cursor: pointer;
	
	&.active
	{
		border-bottom: 3px solid #a6adc3;
	}

	&:hover
	{
		color: #6a779b;
	}
`

export const NavButtonMobile = styled.nav`

	display: none;

	@media screen and (max-width: 768px)
	{
		display: block;
		position: absolute;
		top: 0;
		right: 0px;
		transform: translate(-100%,60%);
		font-size:1.8rem;
		cursor: pointer;
		color: #fff;
		z-index: -1000;
	}

	@media screen and (max-width: 480px)
	{
		display: block;
		position: absolute;
		top: 0;
		right: 0px;
		transform: translate(-70%,50%);
		font-size:1.8rem;
		cursor: pointer;
		color: #fff;
		z-index: -1000;
	}
`
export const NavButton = styled.nav`

	display: flex;
	align-items: center;
	
	@media screen and (max-width: 768px)
	{
		display: none;
	}
`

export const NavButtonLink = styled.button`
	border-radius: 50px;
	background: #061c58;
	white-space: nowrap;
	padding: 10px 22px;
	color: #fff;
	font-size: 16px;
	outline: none;
	border: none;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	text-decoration: none;

	&:hover
	{
		transition: all 0.2s ease-in-out;
		background: #6a779b;
		color: #010606;
	}
`
