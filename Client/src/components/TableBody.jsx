
const TableBody = ({titleName, text, onclick}) => {
  return (
   <>
    <div className="details main-posts">
        <div className='main d-flex'>
            <div className="posts-heading px-3">
                <p className='mt-2'>{titleName}</p>
            </div>
            <div className="posts-heading px-3 text-center">
                <p className='mt-2'>{text}</p>
            </div>
            <div className="posts-heading px-3 text-right">
                <div className="action d-flex justify-content-end">
                    <p className='mt-2 pointer' onClick={onclick}>Delete</p>
                </div>
            </div>
        </div>
    </div>
   </>
  )
}

export default TableBody