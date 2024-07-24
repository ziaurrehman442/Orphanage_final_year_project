import "./list.scss"
import Datatable from "./Datatable"

const List = ({ data, columns }) => {

  return (
    <Datatable data={data} columns={columns}/>
  )
}

export default List