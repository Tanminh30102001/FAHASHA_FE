import React from 'react'
import './Footer.css'
function Footer() {
  return (
    <div>
    <div className="main-footer">
      <div className="container">
        <div className="row">
          {/* Column1 */}
          <div className="col">
            <h4>Đồ án Thực tập tốt nghiệp</h4>
            <h1 className="list-unstyled">
              <li className='gv1'>Giảng viên hướng dẫn:</li>
                <li className='gv'> Nguyễn Thị Như ý</li>
              
            </h1>
          </div>
          {/* Column2 */}
          <div className="col">
            <h4>Thành viên nhóm</h4>
            <ui className="list-unstyled">
              <li>Trịnh Ngô Tân Minh</li>
              <li>Vũ Cao Phi</li>
              <li>Nguyễn Văn Huynh</li>
              <li>Huỳnh Đặng Phi Long</li>
            </ui>
          </div>
          {/* Column3 */}
          <div className="col">
            <h4>Thông tin liên lạc</h4>
            <ui className="list-unstyled">
              <li>-----</li>
              <li>-----</li>
              <li>-----</li>
              <li>-----</li>
            </ui>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} Trường Đại học Công Nghệ Sài Gòn| Khoa Công nghệ Thông tin  | All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>
      </div>
    </div>

    </div>
  )
}

export default Footer