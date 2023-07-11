from newspaper import fulltext
import requests
from pke import unsupervised

class Model():
    def __init__(self, url):
        self.url = url
    
    def find_keywords(self):
        website = requests.get(self.url).text
        text = fulltext(website)
        extractor = unsupervised.TopicRank()
        extractor.load_document(input=text, language='en')

        extractor.candidate_selection()
        extractor.candidate_weighting()
        keyphrases = extractor.get_n_best(n=10)
        words = [x[0] for x in keyphrases]
        # for word in words:
        #     website = website.replace(word,
        #                 "<span style='color: red; font-weight: bold'>" + word + "</span>")

        # return website
        return words