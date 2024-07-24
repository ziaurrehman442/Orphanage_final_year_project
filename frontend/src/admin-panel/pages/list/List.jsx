import "./list.scss"
import Datatable from "../../components/datatable/Datatable"

const List = ({ data, columns, setData, title, link }) => {

  return (
    <Datatable data={data} link={link} columns={columns} setData={setData} title={title}/>
  )
}

export default List