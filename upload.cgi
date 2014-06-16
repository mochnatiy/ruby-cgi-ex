#!/usr/bin/env ruby
 
require 'cgi'

CHUNK_SIZE = 102400

cgi = CGI.new('html4')
params = cgi.params
 
if params.has_key? 'file'
  size = cgi.content_length

  io = params['file'].first
  server_file = 'files/' + io.original_filename
  File.open(server_file.untaint, 'w') do |fin|
    offset = io.tell
    while buffer = io.read(CHUNK_SIZE)
      fin << buffer
      offset = io.tell
      File.open('progress.out', 'w') do |fout| 
        fout.write ((offset.to_f / size.to_f) * 100).to_i.to_s
        fout.close
      end
    end
  end
end

if params.has_key? 'check'
  fout = File.new('progress.out', 'r')
  response = fout.read
  fout.close
  cgi.out('text/plain') { response.to_s }
end

if params.has_key? 'finish'
  File.open('progress.out', 'w') do |fout| 
    fout.write '0'
    fout.close
  end
  cgi.out('text/plain') { 'ok' }
end
