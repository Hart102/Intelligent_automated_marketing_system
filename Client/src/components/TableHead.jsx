
const TableHead = ({tableTitle}) => {
  return (
    <>
    <div className="title px-3 py-1">
        <p className='mt-3 golden-color'><b className="h6 text-uppercase font-weight-bold">{tableTitle}</b></p>
    </div>
    <div className="filter">
        <div className="d-flex">
            <input type="text" placeholder='Search For Post' className='p-2 px-3 border-top border-bottom'/>
            {/* <div className="btn bg-primary text-white" onClick={searchPost}>Search</div> */}
        </div>

        {/* SEARCH RESULT  */}
        <div className="search-result bg-dark text-white">
            {/* {
                searchResult != '' && searchResult.map(ele => (
                    <div className="d-flex justify-content-between bg-success mt-1 p-2 pointer">
                        <p key={ele.news_id}>{ele.news_title}</p>
                        <div className="d-flex">
                            <p className='mx-2' onClick={() => setPostId(ele.news_id)}>Edit</p>
                            <p onClick={() => setClickedPost(ele.news_id)}>Delete</p>
                        </div>
                    </div>

                ))
            } */}
        </div>
    </div>
    </>
  )
}

export default TableHead