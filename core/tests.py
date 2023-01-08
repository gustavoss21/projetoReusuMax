from django.test import TestCase
import pdfkit
pdfkit.from_string(
    '<div style="background:red;margin: 0px 300px"><p>teste</p><p>tesg</p></div>', 'teste.pdf')


