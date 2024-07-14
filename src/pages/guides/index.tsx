import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionActions from '@mui/material/AccordionActions'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Button from '@mui/material/Button'
import HeaderV2 from '@/components/organisms/HeaderV2'
import Head from 'next/head'
import FooterSection from '@/components/molecules/FooterSection'

export default function AccordionUsage() {
  return (
    <div className="bg-white">
      <Head>
        <title>Sneakery - Hướng dẫn</title>
        <link rel="icon" />
      </Head>
      <div className="pb-10 bg-white">
        <HeaderV2 />
        <div className=" min-h-[600px] rounded-lg mt-10  w-5/6 mx-auto ">
          <div>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{ color: '#3b82f6', fontWeight: 500 }}
              >
                Đấu giá là gì ?
              </AccordionSummary>
              <AccordionDetails sx={{ color: '', fontWeight: 300 }}>
                Đấu giá là hình thức mua bán trong đó người bán đưa ra món hàng
                và những người có nhu cầu mua sẽ cạnh tranh với nhau bằng cách
                ra giá tăng dần. Khi kết thúc phiên đấu giá, người tham gia có
                mức giá cao nhất sẽ chiến thắng và sở hữu món hàng.
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
                sx={{ color: '#3b82f6', fontWeight: 800 }}
              >
                Giá khởi điểm - Bước giá là gì ?
              </AccordionSummary>
              <AccordionDetails>
                Đây là 2 thuật ngữ cơ bản trong đấu giá. Trong đó
                <li>
                  Giá khởi điểm là giá ban đầu thấp nhất của sản phẩm đấu giá
                </li>
                <li>
                  Bước giá là mức chênh lệch tối thiểu của lần trả giá sau so
                  với lần trả giá trước liền kề
                </li>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel3-header"
                sx={{ color: '#3b82f6', fontWeight: 800 }}
              >
                Đấu giá tự động là gì ?
              </AccordionSummary>
              <AccordionDetails>
                Đấu giá tự động là hình thức đấu giá trực tuyến tại nhiều
                website lớn như eBay, Yahoo Auctions và được áp dụng tại
                Sneakery. Đấu giá tự động cho phép bạn đặt mức giá tối đa có thể
                trả và hệ thống sẽ tự động tăng giá để giữ cho bạn
                <span style={{ fontWeight: 'bold' }}>vừa đủ thắng</span> những
                người chơi khác mà không cần ra giá liên tục <br /> Cách thức:
                <li>
                  Đầu tiên, bạn ra giá tối đa mà mình có thể trả cho sản phẩm.
                </li>
                <li>
                  Nếu không ai có mức giá tối đa cao hơn bạn, bạn sẽ giành chiến
                  thắng sản phẩm ở mức giá thấp nhất mà hệ thống tự động đặt cho
                  bạn.
                </li>
                <li>
                  Nếu những người chơi ra cùng mức giá, người chơi ra giá trước
                  được ghi nhận là người ra giá cao nhất
                </li>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4-content"
                id="panel4-header"
                sx={{ color: '#3b82f6', fontWeight: 800 }}
              >
                Minh họa phiên đấu giá tự động
              </AccordionSummary>
              <AccordionDetails>
                Một phiên đấu giá tự động sẽ diễn ra như sau
                <br />
                Thông tin sản phẩm đấu giá <br />
                <div className="mt-4 ml-4">
                  <li>Tên sản phẩm: Diamond bracelet</li>
                  <li>Giá khởi điểm: 1500$</li>
                  <li>Bước giá: 100$</li>
                </div>
                <br />
                <table
                  style={{ width: '100%', borderCollapse: 'collapse' }}
                  className="border border-gray-500"
                >
                  <thead>
                    <tr className="bg-blue-200">
                      <th style={{ padding: '12px', textAlign: 'left' }}>
                        Người chơi
                      </th>
                      <th style={{ padding: '12px', textAlign: 'left' }}>
                        Giá đặt
                      </th>
                      <th style={{ padding: '12px', textAlign: 'left' }}>
                        Giá hiện tại sản phẩm
                      </th>
                      <th style={{ padding: '12px', textAlign: 'left' }}>
                        Người giữ giá
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '12px', textAlign: 'left' }}>#1</td>
                      <td style={{ padding: '12px', textAlign: 'left' }}>
                        2000$
                      </td>
                      <td style={{ padding: '12px', textAlign: 'left' }}>
                        1500$
                      </td>
                      <td style={{ padding: '12px', textAlign: 'left' }}>#1</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px', textAlign: 'left' }}>#2</td>
                      <td style={{ padding: '12px', textAlign: 'left' }}>
                        1800$
                      </td>
                      <td style={{ padding: '12px', textAlign: 'left' }}>
                        1900$
                      </td>
                      <td style={{ padding: '12px', textAlign: 'left' }}>#1</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px', textAlign: 'left' }}>#3</td>
                      <td style={{ padding: '12px', textAlign: 'left' }}>
                        2700$
                      </td>
                      <td style={{ padding: '12px', textAlign: 'left' }}>
                        2100$
                      </td>
                      <td style={{ padding: '12px', textAlign: 'left' }}>#3</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px', textAlign: 'left' }}>#4</td>
                      <td style={{ padding: '12px', textAlign: 'left' }}>
                        2700$
                      </td>
                      <td style={{ padding: '12px', textAlign: 'left' }}>
                        2700$
                      </td>
                      <td style={{ padding: '12px', textAlign: 'left' }}>#3</td>
                    </tr>
                  </tbody>
                </table>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel3-header"
                sx={{ color: '#3b82f6', fontWeight: 800 }}
              >
                Làm cách nào để tôi biết tôi bị người
                chơi khác ra giá cao hơn giá của tôi?
              </AccordionSummary>
              <AccordionDetails>
                Khi bạn đang giữ giá và bị người chơi khác ra giá cao hơn, bạn
                sẽ nhận được Email nhắc nhở về phiên đấu giá để có thể tiếp tục
                đặt giá.
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
        <FooterSection />
      </div>
    </div>
  )
}
