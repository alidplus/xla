import { DropdownItem } from "atoms";
import client from 'store/api/feathersClient';

const Actions = function Actions ({ data }) {
  async function generateMatch(){
    await client.service('league/actions').create({
      action: 'generateMatch',
      payload: {
        leagueId: data._id,
      }
    })
  }
     
  return (
    <>
      <DropdownItem onClick={generateMatch}>generate Match</DropdownItem>
    </>
  )
}

export default Actions
