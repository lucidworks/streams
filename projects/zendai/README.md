## Zendai Entity

### Definition
1. Take a URL/site to crawl. (possible)
2. Crawl the site normally. (possible)
3. Extract images from the pages crawled. (possible, but error prone)
4. Call an external API with image URLs. (possible)
5. External API sends the images to Google/Clarafai and return meta data about what is in the image (possible, but error prone and/or incomplete data/context)
6. Take a document's image meta data and add it back to the document in Fusion's index. (possible)
7.  Comparing page meta data and image meta data, establish a baseline of what is in the images vs. what the page is about (unknown).
8. Send the images and the baseline tags to Tensorflow, which is setup in a standard convolutional layout to train itself (main entity) with the images represented with those tags, for this particular deployment of Fusion. (currently possible)
9. Using deepdream-like image generation techniques, extract (dream) images from the main network entity by passing in each document's list of baseline tags. (currently possible - code exists on github to do this)
10. Build an adversarial network entity optimized for measuring probabilities that "dreamed" image contains the previously mentioned baseline tags. (possible)
11. Punish/back-train convolutional model entity with new "feedback" from the second model. (unknown method to tell the the first network's image isn't "good enough" until it is)
12. Save the image to the index when it is. (possible)
13. When someone types in key terms that match previous trainings for a given page, show the image (possible, but does it become a document "index" at this point?)
14. If someone types in known term matches to a known dreamed document PLUS extra terms, dream a new image on the spot and use signals to determine if human entity thinks it's a good image (because they clicked it)

### Example
Crawl Best Buy. Images of TVs and USB cables go to Clarafai/Google Vision. Clarafai says, {'cable', 'power', 'screen', etc.}. Stick that in the document in the index. Send the terms/images to tensorflow. Tensorflow trains on ENTIRE set of images crawled (some not so applicable) + key terms (which may have errors). Tensorflow then is compelled to "dream" each page's combination of key terms into an image. That image is then competitively evaluated by another network whether or
