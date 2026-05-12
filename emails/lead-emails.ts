import type { LeadInput } from "../src/lib/validation";
import { serviceTypeOptions } from "../src/db/enums";

const brandStyles = {
  wrapper: "margin:0;padding:0;background:#020617;color:#ffffff;font-family:Arial,sans-serif;",
  card: "max-width:640px;margin:0 auto;background:#0F172A;border:1px solid #1E293B;border-radius:18px;overflow:hidden;",
  header: "padding:28px 32px;background:linear-gradient(135deg,#2563EB,#1E40AF 55%,#06B6D4);",
  body: "padding:28px 32px;color:#E2E8F0;line-height:1.65;",
  label: "color:#94A3B8;font-size:13px;text-transform:uppercase;letter-spacing:.08em;",
  value: "margin:4px 0 16px;color:#FFFFFF;font-size:16px;",
  button: "display:inline-block;margin-top:18px;padding:13px 18px;border-radius:10px;background:#2563EB;color:#FFFFFF;text-decoration:none;font-weight:700;"
};

function getServiceLabel(value: LeadInput["serviceInterest"]) {
  return serviceTypeOptions.find((item) => item.value === value)?.label ?? value;
}

export function buildAdminLeadEmail(lead: LeadInput) {
  const service = getServiceLabel(lead.serviceInterest);
  const subject = `MIDIGI có lead mới: ${lead.fullName} cần tư vấn ${service}`;
  const html = `
    <body style="${brandStyles.wrapper}">
      <div style="padding:32px 16px;">
        <section style="${brandStyles.card}">
          <div style="${brandStyles.header}">
            <div style="font-size:28px;font-weight:800;">MIDIGI</div>
            <div style="margin-top:8px;font-size:18px;">Khách hàng tiềm năng mới từ website</div>
          </div>
          <div style="${brandStyles.body}">
            <p style="margin-top:0;">Một khách hàng vừa gửi yêu cầu tư vấn. Vui lòng kiểm tra dashboard và phản hồi trong thời gian sớm nhất.</p>
            <div style="${brandStyles.label}">Họ và tên</div><div style="${brandStyles.value}">${lead.fullName}</div>
            <div style="${brandStyles.label}">Số điện thoại</div><div style="${brandStyles.value}">${lead.phone}</div>
            <div style="${brandStyles.label}">Email</div><div style="${brandStyles.value}">${lead.email}</div>
            <div style="${brandStyles.label}">Ngành nghề</div><div style="${brandStyles.value}">${lead.industry}</div>
            <div style="${brandStyles.label}">Dịch vụ cần tư vấn</div><div style="${brandStyles.value}">${service}</div>
            <div style="${brandStyles.label}">Ngân sách dự kiến</div><div style="${brandStyles.value}">${lead.budgetRange}</div>
            <div style="${brandStyles.label}">Nội dung</div><div style="${brandStyles.value}">${lead.message}</div>
            <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/dashboard/leads" style="${brandStyles.button}">Mở dashboard</a>
          </div>
        </section>
      </div>
    </body>`;
  const text = [
    "MIDIGI có khách hàng tiềm năng mới từ website.",
    `Họ tên: ${lead.fullName}`,
    `Số điện thoại: ${lead.phone}`,
    `Email: ${lead.email}`,
    `Ngành nghề: ${lead.industry}`,
    `Dịch vụ: ${service}`,
    `Ngân sách: ${lead.budgetRange}`,
    `Nội dung: ${lead.message}`
  ].join("\n");

  return { subject, html, text };
}

export function buildCustomerConfirmationEmail(lead: LeadInput) {
  const service = getServiceLabel(lead.serviceInterest);
  const subject = "MIDIGI đã nhận yêu cầu tư vấn của bạn";
  const html = `
    <body style="${brandStyles.wrapper}">
      <div style="padding:32px 16px;">
        <section style="${brandStyles.card}">
          <div style="${brandStyles.header}">
            <div style="font-size:28px;font-weight:800;">MIDIGI</div>
            <div style="margin-top:8px;font-size:18px;">Cảm ơn bạn đã liên hệ</div>
          </div>
          <div style="${brandStyles.body}">
            <p style="margin-top:0;">Xin chào ${lead.fullName},</p>
            <p>MIDIGI đã nhận yêu cầu tư vấn về <strong style="color:#FFFFFF;">${service}</strong>. Đội ngũ tư vấn sẽ rà soát thông tin và phản hồi bạn trong thời gian làm việc gần nhất.</p>
            <p>Để buổi trao đổi hiệu quả hơn, bạn có thể chuẩn bị thêm mục tiêu kinh doanh, kênh marketing hiện tại và ngân sách dự kiến cho giai đoạn sắp tới.</p>
            <div style="${brandStyles.label}">Thông tin đã gửi</div>
            <div style="${brandStyles.value}">Ngành nghề: ${lead.industry}<br/>Ngân sách: ${lead.budgetRange}</div>
            <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/dich-vu" style="${brandStyles.button}">Xem thêm dịch vụ MIDIGI</a>
          </div>
        </section>
      </div>
    </body>`;
  const text = [
    `Xin chào ${lead.fullName},`,
    `MIDIGI đã nhận yêu cầu tư vấn về ${service}.`,
    "Đội ngũ tư vấn sẽ rà soát thông tin và phản hồi bạn trong thời gian làm việc gần nhất.",
    `Ngành nghề: ${lead.industry}`,
    `Ngân sách: ${lead.budgetRange}`
  ].join("\n");

  return { subject, html, text };
}
