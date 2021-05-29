import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useEffect, useState } from 'react';
import { getUsers, setUsersSort } from '../../../../store/users/reducer';
import { useSelector, useDispatch } from 'react-redux'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { users as userData } from '../../../constants';
import { useSortableData } from './hooks/useSortableData';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import { ModalEdit } from '../Dashboard/components/modalEdit'
import { deleteSelectedUser } from '../../../../store/users/reducer'
import { AccessGraph } from './components/AccessGraph';
import {Graphs} from './components/Graphs'
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  modalEdit: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& .MuiFormControl-root': {
      marginBottom: '25px',
      marginRight: '25px'
  }
  },
  containerSearch: {
    margin: '25px',
    '& .MuiButtonBase-root': {
      width: '84px',
      height: '31px',
      marginTop: '16px',
      marginBottom: '16px',
      marginLeft: '16px'
    }
  }
});

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const users = useSelector((state: any) => state.users)

  useEffect(() => {
    dispatch(getUsers(userData))
  }, [dispatch])

  const { items, requestSort, sortConfig } = useSortableData(users.users);
  const getSort = (name: string) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig?.key === name ? sortConfig?.direction : undefined;
  };

  const headersTable = [{
    description: 'ID',
    field: 'id'
  }, {
    description: 'Name',
    field: 'name'
  }, {
    description: 'Last Name',
    field: 'lastName'
  }, {
    description: 'Email',
    field: 'email'
  }, {
    description: 'Created At',
    field: 'createdAt'
  }, {
    description: 'Address',
    field: 'address'
  }]

  const [searchText, setSearchText] = useState('')

  const handleSearch = () => {
    const usersCopy = userData
    const usersFiltered = usersCopy.filter((user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.id.toLowerCase().includes(searchText.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
      user.address.toLowerCase().includes(searchText.toLowerCase()) ||
      user.createdAt.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase())
    )
    dispatch(setUsersSort(usersFiltered))
  }

  const [isModalOpen, setModalOpen] = useState(false)
  const [user, setUser] = useState({})

  const editUser = (user: any) => {
    setModalOpen(true)
    setUser(user)
  }

  const handleCloseEditModal = () => {
    setModalOpen(false)
  }

  const deleteUser = (user: any) => {
    dispatch(deleteSelectedUser(user))
  }

  const [isModalOpenAccess, setModalOpenAccess] = useState(false)
  const [userAccess, setUserAccess] = useState({})

  const handleAccessModal = (user: any) => {
    setUserAccess(user)
    setModalOpenAccess(true)
  }

  const handleCloseAccessModal = () => {
    setUserAccess({})
    setModalOpenAccess(false)
  }

  return (
    <div>
      <>
      <div className={classes.containerSearch}>
        <TextField
          label="Search by"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
      </Button>
      </div>

        <TableContainer component={Paper}>
          <Table className={classes.table} size="small">
            <TableHead>
              <TableRow>
                {headersTable.map((item) => {
                  const sort = getSort(item.field)
                  return (
                    <TableCell align={item.field === 'id' ? "left" : 'right'} key={item.description} onClick={() => requestSort(item.field)}>
                      {item.description}
                      {sort === 'ascending' ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                    </TableCell>
                  )
                })}
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
                <TableCell>Access Times</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row: any) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.lastName}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.createdAt}</TableCell>
                  <TableCell align="right">{row.address}</TableCell>
                  <TableCell><EditIcon onClick={() => editUser(row)} /></TableCell>
                  <TableCell><DeleteIcon onClick={() => deleteUser(row)} /></TableCell>
                  <TableCell onClick={() => handleAccessModal(row)}>See access</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal
          open={isModalOpen}
          onClose={handleCloseEditModal}
          className={classes.modalEdit}
        >
          <ModalEdit user={user} handleCloseEditModal={handleCloseEditModal} />
        </Modal>

        <Modal
          open={isModalOpenAccess}
          onClose={handleCloseAccessModal}
        >
          <AccessGraph user={userAccess} handleCloseAccessModal={handleCloseAccessModal} />
        </Modal>
        <Graphs />
      </>
    </div>
  );
}

export default Dashboard