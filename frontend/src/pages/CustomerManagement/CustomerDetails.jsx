import React from 'react'
import { DeleteButton } from '../../components/global/DeleteButton';
import { EditButton } from '../../components/global/EditButton';
import Header from '../../components/Header';

const CustomerDetails = () => {

  return (
    <div>
        <div className='flex justify-between w-full'>
        <Header title={"CUSTOMER"} subtitle={"DETAILS"} />
        <div className='flex justify-end'>
          <EditButton />
          <DeleteButton />
        </div>
      </div>
    </div>
  )
}

export default CustomerDetails