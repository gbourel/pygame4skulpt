
let debug = () => {}; // console.info;

const _audios = [];
let _audioElt = null;
let _volume = 1.0;


function mixer_Sound(gbl, loc) {
    loc.__init__ = new Sk.builtin.func(function (self, filename) {
        self.audioElt = null;
        if (filename) {
            self.audioElt = new Audio((Sk.audioPath || '') + filename.v);
        }
        return Sk.builtin.none.none$;
    }, gbl);
    loc.__init__.co_name = new Sk.builtin.str('__init__');
    loc.__init__.co_varnames = ['self', 'filename'];
    loc.__init__.$defaults = [Sk.ffi.remapToPy(0)];
    loc.play = new Sk.builtin.func(function (self, loops, maxtime, fade_ms) {
        if (self.audioElt) {
            self.audioElt.play();
        }
        return Sk.builtin.none.none$;
    }, gbl);
    loc.play.co_name = new Sk.builtin.str('play');
    loc.play.co_varnames = ['self', 'loops', 'maxtime', 'fade_ms'];
    loc.play.$defaults = [new Sk.builtin.int_(0), new Sk.builtin.int_(0), new Sk.builtin.int_(0)];

    loc.stop = new Sk.builtin.func(function (self) {
        return Sk.builtin.none.none$;
    }, gbl);

    loc.fadeout = new Sk.builtin.func(function (self, time) {
        return Sk.builtin.none.none$;
    }, gbl);

    loc.set_volume = new Sk.builtin.func(function (self, volume) {
        if (self.audioElt && volume) {
            self.audioElt.volume = volume.v;
        }
        return Sk.builtin.none.none$;
    }, gbl);
    loc.set_volume.co_name = new Sk.builtin.str('set_volume');
    loc.set_volume.co_varnames = ['self', 'volume'];
    loc.set_volume.$defaults = [new Sk.builtin.float_(1.0)];

    loc.get_volume = new Sk.builtin.func(function (self) {
        return new Sk.builtin.float_(1.0);
    }, gbl);
}
mixer_Sound.co_name = new Sk.builtin.str('Sound');

const soundClass = Sk.misceval.buildClass(mod, mixer_Sound, 'Sound', []);

var init$1 = function $__init__123$(self) {
    return Sk.builtin.none.none$;
};
init$1.co_name = new Sk.builtins['str']('__init__');
init$1.co_varnames = ['self'];

var repr$1 = function $__repr__123$(self) {
    return Sk.ffi.remapToPy('<Music>');
};
repr$1.co_name = new Sk.builtin.str('__repr__');
repr$1.co_varnames = ['self'];

var mixer_Music = function $Music$class_outer(gbl, loc) {
    loc.__init__ = new Sk.builtin.func(init$1, gbl);
    loc.__repr__ = new Sk.builtin.func(repr$1, gbl);
    loc.load = new Sk.builtin.func(function (filename) {
        debug('Mixer load', filename);
        if(filename) {
            let filePath = (Sk.audioPath || '') + filename.v;
            _audios.push(filePath);
            _audioElt = new Audio(_audios[0]);
            debug('Loaded', filename, _audios);
        } else {
            console.error('Cannot load empty filename.');
        }
    });
    loc.unload = new Sk.builtin.func(function () {});
    loc.play = new Sk.builtin.func(function (loops, start, fade) {
        if(_audioElt) {
            if (loops) {
                if (loops.v == -1) { _audioElt.loop = true; }
                else {
                    console.warn('TODO multiple loops');
                }
            }
            _audioElt.play();
        } else {
            console.warn('Cannot play audio before load.');
        }
    });
    loc.play.co_name = new Sk.builtin.str('play');
    loc.play.co_varnames = ['loops', 'start', 'fade'];
    loc.play.$defaults = [new Sk.builtin.int_(0), new Sk.builtin.float_(0.0), new Sk.builtin.int_(0)];

    loc.rewind = new Sk.builtin.func(function () {});
    loc.stop = new Sk.builtin.func(function () {});
    loc.pause = new Sk.builtin.func(function () {});
    loc.unpause = new Sk.builtin.func(function () {});
    loc.set_volume = new Sk.builtin.func(function (volume) {
        if (_audioElt && volume) {
            _audioElt.volume = volume.v;
        }
    });
    loc.set_volume.co_name = new Sk.builtin.str('set_volume');
    loc.set_volume.co_varnames = ['volume'];
    loc.set_volume.$defaults = [new Sk.builtin.float_(1.0)];

    loc.get_volume = new Sk.builtin.func(function () {
        return new Sk.builtin.float_(_volume);
    });
    loc.get_busy = new Sk.builtin.func(function () {});
    loc.set_pos = new Sk.builtin.func(function () {});
    loc.get_pos = new Sk.builtin.func(function () {});
}
mixer_Music.co_name = new Sk.builtin.str('Music');

const $builtinmodule = function (name) {
    const mod = {};
    mod.init = new Sk.builtin.func(function () {
        debug('Init mixer');
        mod.music = Sk.misceval.buildClass(mod, mixer_Music, 'Music', []);
        mod.Sound = Sk.misceval.buildClass(mod, mixer_Sound, 'Sound', []);
        PygameLib.quitListeners.push(() => {
            if(_audioElt) {
                _audioElt.pause();
                _audioElt = null;
            }
        });
    });
    return mod;
};
