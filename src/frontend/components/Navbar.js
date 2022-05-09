import { Navbar, Nav, Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from './logo.png'

const Navigation = ({ web3Handler, account }) => {
    return (
        <Navbar expand='lg' bg='secondary' variant='dark'>
            <Container>
                <Navbar.Brand href='#'>
                    <img src={logo} width='40' height='40' className='' alt='' />
                    &nbsp; NFT Marketplace
                </Navbar.Brand>
                    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                        <Navbar.Collapse id='responsive-navbar-nav'>
                            <Nav className='me-auto'>
                                <Nav.Link href='/'>Home</Nav.Link>
                                <Nav.Link href='/create'>Create</Nav.Link>
                                <Nav.Link href='/my-listed-items'>My Listed Items</Nav.Link>
                                <Nav.Link href='/my-purchases'>My Purchases</Nav.Link>
                            </Nav>
                            <Nav>
                                {account ? (
                                    <Button href={`https://etherscan.io/address/${account}`} target='_blank' rel='noopener noreferrer' className='button nav-button btn-sm mx-4'>
                                        <p variant='outline-light'>
                                            {account.slice(0, 5) + '...' + account.slice(38, 42)}
                                        </p>
                                    </Button>
                                ) : (
                                    <Button onClick={web3Handler} variant='outline-light'>Connect Wallet</Button>
                                )}
                            </Nav>
                        </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation;