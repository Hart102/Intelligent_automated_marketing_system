
const TableBody = ({name, text}) => {
  return (
    <div className="table-container d-flex justify-content-between mt-2 border-bottom">
      <div className="posts-heading px-3">
          <p><b>{name}</b></p>
      </div>
      <div className="posts-heading px-3 text-center">
          <p><b>{text}</b></p>
      </div>
      <div className="posts-heading px-3 text-right">
          <p><b>Manipulate</b></p>
      </div>
    </div>
  )
}

export default TableBody