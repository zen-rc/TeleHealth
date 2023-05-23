console.log('hello world')
    console.log(window.location.href)
    const picture = new QRCode(document.getElementById('qrcode'))
    picture.makeCode(`${window.location.href}`)

    // printable qr code
    function qrPrint() {
      const qrCodeEllie = document.getElementById('qrcode').getElementsByTagName('canvas')[0]
      // const newWindow = window.open('', '_blank')

      // newWindow.document.open()
      // console.log(qrCodeEllie.outerHTML)
      // newWindow.document.write('<html><body onload="window.print()">' +
        // '<div>hello world</div>'
        // `${qrCodeEllie.outerHTML}`
        // + '</body></html>') //changed 
      // newWindow.document.close() //can keep this if you want page to automatically close after printed.

      let img = new Image(); //make sure to put dimensions into a stylesheet later
      console.log(qrCodeEllie)
      img.src = getCanvasImage(qrCodeEllie);

      let newWindow = window.open("", "_blank");
      newWindow.document.write('<html><body onload="window.print()"><img src="' + img.src + '"></body></html>');
      newWindow.document.close();
    }

    function getCanvasImage(element) {
      let canvas = document.createElement('canvas');
      let context = canvas.getContext('2d');

      // Draw the element onto the canvas
      context.drawImage(element, 0, 0);

      // Return the image data
      return canvas.toDataURL('image/png');
    }
    document.onload = qrPrint()