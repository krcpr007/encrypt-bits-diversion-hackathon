import bchlib

BCH_POLYNOMIAL = 8219
BCH_BITS = 72
# print(help(bchlib))
try:
    bch = bchlib.BCH(BCH_POLYNOMIAL, BCH_BITS)
    print("BCH initialized successfully!")
except RuntimeError as e:
    print(f"Error initializing BCH: {e}")
 