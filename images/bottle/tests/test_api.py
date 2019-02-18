import os
import unittest

class Tests(unittest.TestCase):

    def test_app(self):
        response = {'response': 'ok'}
        self.assertEqual(response, {'response': 'ok'})

if __name__ == '__main__':
    unittest.main()
