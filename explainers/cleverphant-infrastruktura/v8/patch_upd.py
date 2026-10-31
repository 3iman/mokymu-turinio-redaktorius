import json, re
T = open('template.html', encoding='utf-8').read()
L = T.split('\n')
# HTML: 239–244 (c12m, c12n, c12y, c12bites, c12eat)
assert 'id="c12m"' in L[238] and 'id="c12eat"' in L[243], (L[238][:40], L[243][:40])
L[238:244] = [
 '    <div class="h" id="c12m">One bite at a time. <em>Continuously</em>.</div>',
 '    <div class="h" id="c12n">The bigger the network, the more <em>everyone gains</em>.</div>',
 '    <div id="c12eat" class="abs" style="left:170px;top:320px;width:300px;height:300px;opacity:0"><img src="assets/simbolis.svg" alt="" style="width:300px"></div>',
 '    <div id="c12job" class="abs" style="left:120px;top:640px;width:400px;text-align:center;opacity:0"><div style="font:700 30px Inter, sans-serif;color:#1e293b">Hundreds of websites</div><div style="font:500 26px Inter, sans-serif;color:#475569;margin-top:6px">accessible · current · stable</div></div>',
 '    <div id="c12upd"></div><div id="c12mini"></div>']
T = '\n'.join(L)
a = T.index('  tl.to(["#c12site", "#c12troj"], { opacity: 0, y: -20')
b = T.index('  head("#c12b", w(12, "every next step") - 0.1);')
T = T[:a] + open('upd_en.js', encoding='utf-8').read() + T[b:]
open('template.html', 'w', encoding='utf-8').write(T)
V = open('voice.py', encoding='utf-8').read()
old = "'eat an elephant', 'One bite', 'Today the', 'Tomorrow', 'The day after', 'reform', 'A year later',"
assert old in V
V = V.replace(old, "'biggest job', 'eat an elephant', 'One bite', 'Small improvements', 'ship regularly', 'to all schools', 'our strength', 'more eyes', 'every improvement',")
open('voice.py', 'w', encoding='utf-8').write(V)
S = json.load(open('scenes.json', encoding='utf-8'))
for s in S:
    if 'How do you eat an elephant?' in s['voice']:
        a = s['voice'].index('How do you eat'); b = s['voice'].index('And every next step')
        s['voice'] = s['voice'][:a] + ("It is also the biggest job: hundreds of school websites have to stay accessible, current and stable. "
          "How do you eat an elephant like that? One bite at a time, continuously. Small improvements, cosmetic fixes and bug fixes "
          "ship regularly and consistently, to all schools. That is our strength: the bigger the network, the more eyes notice, "
          "and the more schools gain from every improvement and every extra touch. ") + s['voice'][b:]
        print(s['voice'])
json.dump(S, open('scenes.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
