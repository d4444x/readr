from __future__ import  division
from textstat.textstat import textstat
import numpy as np
from sklearn.linear_model import SGDClassifier


#returns the predictors for a given text document
def text_analytics(text):
    if textstat.sentence_count(text) != 0:
        lexicon = textstat.lexicon_count(text) #word count
        sent = textstat.sentence_count(text) #sentence count
        syll = textstat.syllable_count(text) #syllable count
        flesch = textstat.flesch_reading_ease(text) #flesch score
        smog = textstat.smog_index(text) #SMOG index
        fog = textstat.gunning_fog(text) #FOG index
        dale = textstat.dale_chall_readability_score(text) #grade level
        ari = textstat.automated_readability_index(text) #grade level
        cl = textstat.coleman_liau_index(text) #grade level

        flesch1 = lexicon*flesch
        flesch2 = sent*flesch
        flesch3 = syll*flesch
        smog1 = lexicon*smog #SMOG index
        smog2 = sent*smog
        smog3 = syll*smog
        fog1 = lexicon*fog
        fog2 = sent*fog
        fog3 = syll*fog
        dale1 = lexicon*dale
        dale2 = sent*dale
        dale3=syll*dale
        ari1 = lexicon*ari
        ari2 = sent*ari
        ari3 = syll*ari
        cl1 = lexicon*cl
        cl2 = sent*cl
        cl3 = syll*cl
        #x = [lexicon,sent,syll,flesch,smog,fog,dale,ari,cl]
        #x = [lexicon,sent,flesch,dale]
        x=[lexicon,sent,syll,flesch,smog,fog,dale,ari,cl,flesch1,flesch2,flesch3,smog1,                 smog2,smog3,fog1,fog2,fog3,dale1,dale2,dale3,ari1,ari2,ari3,cl1,cl2,cl3]
    return(x)

#returns the expected time
def getReadTime(X,y,content,col_names):
    clf = SGDClassifier(loss="squared_loss")
    clf.fit(X,y)
    x=text_analytics(content)
    x = order_x(x,col_names)
    return clf.predict(x)

#returns expected time for a new user
def getReadTimeNewUser(content):
    avg_murica = 200 #wpm
    return textstat.lexicon_count(content) / (avg_murica / 60)

#returns a dictionary with the index of each predictor that gets returned in text_analytics()
def getXdict():
    result = {}
    names = ['lexicon','sent','syll','flesch','smog','fog','dale','ari','cl',
             'flesch1','flesch2','flesch3',
             'smog1','smog2','smog3',
             'fog1','fog2','fog3',
             'dale1','dale2','dale3',
             'ari1','ari2','ari3',
             'cl1','cl2','cl3']
    for index,name in zip(range(len(names)),names):
        result[name]=index
    return result


#orders the colums in x to be consistent with the column order in timetommy.py
def order_x(x,col_names):
    curr_mapping = getXdict()
    ordered_x = []
    for name in col_names:
        curr_index = curr_mapping[name]
        ordered_x.append(x[curr_index])
    return ordered_x






