from eazymind.nlp.eazysum import Summarizer

#---key from eazymind website---
key = "d7a5dbe89179dd6640ddd0250c6512eb"

#---sentence to be summarized---
sentence = """(CNN)The White House has instructed former
    White House Counsel Don McGahn not to comply with a subpoena
    for documents from House Judiciary Chairman Jerry Nadler,
    teeing up the latest in a series of escalating oversight
    showdowns between the Trump administration and congressional Democrats."""

summarizer = Summarizer(key)
print(summarizer.run(sentence))
