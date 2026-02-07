//define buttons used throughout site 

import Button from '@mui/material/Button';
import { ButtonGroup } from '@mui/material';

//make header and footer button groups that export as the entire set of buttons




const button =  <Button variant="contained" >Text</Button>



function HeaderButtons() {
    return (
        <ButtonGroup variant="contained">
            <Button href="/">Home</Button>
            <Button href="/rosters">Rosters</Button>
            <Button href="/recentTransactions">Recent Transactions</Button>
            <Button href="/matchups">Matchups</Button>
            <Button href="/history">League History</Button>
        </ButtonGroup>
    )
}
