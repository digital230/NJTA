const verificationEmail = (name, verifyLink) => {
  return `<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns:v="urn:schemas-microsoft-com:vml">

<head>
  <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
  <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
  <meta content="width=device-width" name="viewport" />
  <!--[if !mso]><!-->
  <meta content="IE=edge" http-equiv="X-UA-Compatible" />
  <!--<![endif]-->
  <title></title>
  <!--[if !mso]><!-->
  <!--<![endif]-->
  <style type="text/css">
      body {
          margin: 0;
          padding: 0;
      }

      table,
      td,
      tr {
          vertical-align: top;
          border-collapse: collapse;
      }

      * {
          line-height: inherit;
      }

      a[x-apple-data-detectors=true] {
          color: inherit !important;
          text-decoration: none !important;
      }
  </style>
  <style id="media-query" type="text/css">
      @media (max-width: 670px) {

          .block-grid,
          .col {
              min-width: 320px !important;
              max-width: 100% !important;
              display: block !important;
          }

          .block-grid {
              width: 100% !important;
          }

          .col {
              width: 100% !important;
          }

          .col>div {
              margin: 0 auto;
          }

          img.fullwidth,
          img.fullwidthOnMobile {
              max-width: 100% !important;
          }

          .no-stack .col {
              min-width: 0 !important;
              display: table-cell !important;
          }

          .no-stack.two-up .col {
              width: 50% !important;
          }

          .no-stack .col.num4 {
              width: 33% !important;
          }

          .no-stack .col.num8 {
              width: 66% !important;
          }

          .no-stack .col.num4 {
              width: 33% !important;
          }

          .no-stack .col.num3 {
              width: 25% !important;
          }

          .no-stack .col.num6 {
              width: 50% !important;
          }

          .no-stack .col.num9 {
              width: 75% !important;
          }

          .video-block {
              max-width: none !important;
          }

          .mobile_hide {
              min-height: 0px;
              max-height: 0px;
              max-width: 0px;
              display: none;
              overflow: hidden;
              font-size: 0px;
          }

          .desktop_hide {
              display: block !important;
              max-height: none !important;
          }
      }
  </style>
</head>

<body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #FFFFFF;">
  <!--[if IE]><div class="ie-browser"><![endif]-->
  <table bgcolor="#FFFFFF" cellpadding="0" cellspacing="0" class="nl-container" role="presentation"
      style="table-layout: fixed; vertical-align: top; min-width: 320px; Margin: 0 auto; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; width: 100%;"
      valign="top" width="100%">
      <tbody>
          <tr style="vertical-align: top;" valign="top">
              <td style="word-break: break-word; vertical-align: top;" valign="top">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#FFFFFF"><![endif]-->
                  <div style="padding: 40px 20px;">
                      <h1 style="margin-bottom: 20px; font-stretch: normal; font-size: 13px; line-height: normal;
                          font-family: Times; color: #1c1e21; "><span style="font-size: 24pt; font-family: arial,
                              helvetica, sans-serif; color: #236fa1; ">Welcome to NJTA</span></h1>
                      
                      <p style="margin-bottom: 20px; font-stretch:
                          normal;font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: normal; color: #1c1e21; "><span
                              style="font-size: 18pt; color: #7e8c8d; "><strong>Dear ${name}!</strong></span></p>
                      
                      <p style="margin-bottom: 20px; font-stretch:
                          normal; font-size: 13px; line-height: normal; font-family: Times; color: #1c1e21; "><span
                              style="font-size: 12pt; font-family: arial, helvetica, sans-serif; ">Thank you for
                              signing up to NJTA.</span></p>
                      
                      <p style="margin-bottom: 0px; font-stretch: normal; font-size: 13px; line-height: normal;
                          font-family: Times; color: #1c1e21; "><span style="font-family: arial, helvetica,
                              sans-serif; font-size: 12pt; ">To verify your account, please click on the link
                              below</span></p>
                              <a style="margin-bottom: 20px;" href="${verifyLink}">Verify Email</a>
                              
                      
                      <p style="margin-bottom: 0px;
                          font-stretch: normal; font-size: 13px; line-height: normal; font-family: Times; color:
                          #1c1e21; "><span style="font-size: 12pt; font-family: arial, helvetica, sans-serif; ">At
                              your service,</span>
                              <br>
                              <strong>NJTA team.</strong>
                              </p>
                              
                          
                  </div>

                  <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
              </td>
          </tr>
      </tbody>
  </table>
  <!--[if (IE)]></div><![endif]-->
</body>

</html>`;
};

module.exports = { verificationEmail };
